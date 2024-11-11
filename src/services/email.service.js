const { google } = require('googleapis');
const gmail = google.gmail('v1');
const fs = require('fs').promises;
const path = require('path');
const { Email, Task, SubEmail, GmailUser, Chat, Rule, G_Credential, G_Token } = require('../models');
const { authenticate } = require('@google-cloud/local-auth');
const mime = require('mime-types');
const { Op } = require('sequelize');
const { PubSub } = require('@google-cloud/pubsub');
const pubSubClient = new PubSub();
const Sequelize = require('sequelize');
const { getRandomColor } = require('../utils/colorUtils');
const dotenv = require('dotenv');
const fsSync = require('fs');
const { promises } = require('dns');

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/pubsub',
  'https://www.googleapis.com/auth/chat.messages',
  // '  https://www.googleapis.com/auth/gmail.modify',
  // 'https://www.googleapis.com/auth/gmail.compose'

];

const UPLOADS_PATH = path.join(process.cwd(), 'uploads');

//this function load the credentials and token 
async function loadSavedCredentialsIfExist() {
  try {
    const [credentials, tokens] = await Promise.all([
      G_Credential.findAll(),
      G_Token.findAll()
    ]);

    const tokenMap = {};
    tokens.forEach(token => {
      tokenMap[token.client_id] = token;
    });

    const clients = await Promise.all(credentials.map(async (cred) => {
      const token = tokenMap[cred.client_id];
      if (token) {
        const redirectUris = Array.isArray(cred.redirect_uris) ? cred.redirect_uris : [cred.redirect_uris];

        const oauth2Client = new google.auth.OAuth2(
          cred.client_id,
          cred.client_secret,
          redirectUris[0]  // Use the first redirect URI
        );

        oauth2Client.setCredentials({ refresh_token: token.refresh_token });
        return oauth2Client;
      }
    }));

    // Filter out any undefined values in case some credentials didn't have tokens
    return clients.filter(client => client !== undefined);
  } catch (err) {
    console.error('Error fetching credentials and tokens:', err);
    throw err;
  }

}

//this function save or update the token
async function saveOrUpdateTokens(tokens, clientId, clientSecret) {
  try {
    const [token, created] = await G_Token.findOrCreate({
      where: { client_id: clientId },
      defaults: {
        type: 'authorized_user',
        token_status: 'token is authorized',
        status: 1,
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: tokens.refresh_token || null,
        access_token: tokens.access_token,
        expireDate: tokens.expiry_date,
      },
    });
    // If the token already exists, update the token
    if (!created) {
      // Update the existing token with new values
      token.access_token = tokens.access_token;
      if (tokens.refresh_token) {
        token.refresh_token = tokens.refresh_token;
      }
      token.expireDate = tokens.expiry_date;
      if (!token.token_status) {
        token.token_status = 'token is authorized';
      }
      if (token.status === null) {
        token.status = 1;
      }
      await token.save(); // Save the updated token to the database
      console.log(`Token updated for client_id: ${clientId}`);
      await G_Credential.update(
        { status: 1 }, // Update to the desired status
        { where: { client_id: clientId } }
      );
      console.log(`Credential status updated for client_id: ${clientId}`);

    } else {
      console.log(`Token created for client_id: ${clientId}`);
    }

  } catch (error) {
    console.error('Error saving or updating tokens:', error);
    throw new Error('Database error while saving or updating tokens');
  }
}

// this function retun the client 
async function authorize() {
  const clients = await loadSavedCredentialsIfExist();
  return clients;

}
//this function is use to find the lable 
async function listLabels(auth) {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.labels.list({
    userId: 'me',
  });
  return res.data.labels;
}
//this function is use to save the attachment which is comming from the email or reply 
async function saveAttachments(email, messageId, auth) {
  const gmail = google.gmail({ version: 'v1', auth });
  const attachmentPaths = [];

  if (email.payload && email.payload.parts) {
    for (const part of email.payload.parts) {
      if (part.filename && part.body && part.body.attachmentId) {
        const attachment = await gmail.users.messages.attachments.get({
          userId: 'me',
          messageId: messageId,
          id: part.body.attachmentId,
        });

        const attachmentData = attachment.data.data.replace(/-/g, '+').replace(/_/g, '/');
        const buffer = Buffer.from(attachmentData, 'base64');

        const timestamp = new Date(Number(email.internalDate)).toISOString().replace(/:/g, '-');
        const uniqueFilename = `${timestamp}_${part.filename}`;
        const attachmentPath = path.join(UPLOADS_PATH, uniqueFilename);

        await fs.writeFile(attachmentPath, buffer);
        attachmentPaths.push(attachmentPath);
      }
    }
  }

  return attachmentPaths;
}
// this function use to save the original mail 
async function saveEmailToDatabase(msg, fetchAfterDate, gmailUserId, attachmentPaths) {
  try {
    let subject = '';
    let body = '';
    let sentTo = '';
    let sentBy = '';
    let name = '';
    let labels = msg.labelIds || [];
    const threadId = msg.threadId;
    let isReply = false;

    if (msg.payload.headers) {
      const subjectHeader = msg.payload.headers.find(header => header.name === 'Subject');
      subject = subjectHeader ? subjectHeader.value : '';

      const toHeader = msg.payload.headers.find(header => header.name === 'To');
      sentTo = toHeader ? toHeader.value : '';

      const fromHeader = msg.payload.headers.find(header => header.name === 'From');
      sentBy = fromHeader ? fromHeader.value : '';

      if (fromHeader) {
        const nameMatch = fromHeader.value.match(/"(.*?)"/);
        name = nameMatch ? nameMatch[1] : fromHeader.value.split('<')[0].trim();
      }
      const inReplyToHeader = msg.payload.headers.find(header => header.name === 'In-Reply-To');
      const referencesHeader = msg.payload.headers.find(header => header.name === 'References');
      isReply = !!inReplyToHeader || !!referencesHeader;
    }

    if (isReply) {

      const originalEmail = await Email.findOne({ where: { gmailMessageId: threadId } });
      if (originalEmail) {
        originalEmail.updateAtEmail = new Date();
        await originalEmail.save();
      }
      return;
    }

    if (msg.payload.parts && msg.payload.parts.length > 0) {
      const mainBodyPart = msg.payload.parts[0];
      if (mainBodyPart.body && mainBodyPart.body.data) {
        body = Buffer.from(mainBodyPart.body.data, 'base64').toString();
      }
    }

    const gmailMessageId = msg.id;
    const existingEmail = await Email.findOne({ where: { gmailMessageId } });

    if (existingEmail) {
      return;
    }

    const emailDate = new Date(parseInt(msg.internalDate));

    if (emailDate > fetchAfterDate) {
      const email = await Email.create({
        gmailMessageId,
        sentTo,
        sentBy,
        subject,
        body,
        name,
        attachmentPaths: attachmentPaths.join(',').length > 0 ? attachmentPaths : null,
        createdAtEmail: emailDate,
        updateAtEmail: emailDate,
        gmailUserId,
        labels: labels.join(','),
      });
      await processRulesAndCreateTasks({
        labels: labels.join(','),
        subject: subject,
        gmailMessageId,
        gmailUserId
      });
      await GmailUser.update({ where: { email } }, { fetchedAt: new Date() });

    } else {
    }
  } catch (error) {
    console.error('Error saving email to database:', error);

  }
}
// this function is use to create automation 
async function processRulesAndCreateTasks(email) {
  const rules = await Rule.findAll({ 
    where: { 
      type: 'new',
      status: true || 1  // Note: 'true || 1' is redundant. Consider using just `true`.
    }
  });


  for (const rule of rules) {
    console.log("=================1111111",rule.when)
    const whenConditions = (rule.when);
    console.log("=================222222222",whenConditions)


    // const labelMatches = whenConditions.labels
    // console.log("=================33333333",labelMatches)

    //   ? email.labels && email.labels.includes(whenConditions.labels)
    //   : true;

    // const subjectMatches = whenConditions.subject
    //   ? email.subject && email.subject.includes(whenConditions.subject)
    //   : true;

    const userIdMatches = email.gmailUserId === whenConditions.gmailUserId;
    console.log("=================4444444444",userIdMatches)

    // if (userIdMatches && (labelMatches || subjectMatches)) {
      if (userIdMatches) {
      const boardJson = rule.condition;
      const board = (boardJson);

      const boardId = board.boardId;
      const boardListId = board.boardListId;
      const ruleUserId = (rule.action).userId;
      console.log("=================55555555555",ruleUserId)

      const taskPayload = {
        gmailMessageId: email.gmailMessageId,
        boardId: boardId,
        boardListId: boardListId,
        userId: ruleUserId,
      };
      console.log("=================6666666666",taskPayload)

      const taskController = require('../controllers/task.controller');

      await taskController.createTask({ body: taskPayload }, { status: (code) => ({ json: (response) => console.log(response) }) });

    }
  }
}
//this function is use to send the mail
async function sendEmail1(sentBy, recipient, subject, message, attachmentPaths) {
  const clients = await authorize();

  for (const client of clients) {
    try {
      const gmail = google.gmail({ version: 'v1', auth: client });

      // Compose and send the email here
      const email = [
        `To: ${recipient}`,
        `From: ${sentBy}`,
        'Content-Type: multipart/mixed; boundary="foo_bar_baz"',
        `Subject: ${subject}`,
        '',
        '--foo_bar_baz',
        'Content-Type: text/plain; charset="UTF-8"',
        '',
        message,
        '',
      ];

      if (!user) {
        console.error(`User not found for email: ${email}`);
        continue;
      }
      let fetchAfterDate = new Date();
      if (user && user.fetchedAt) {
        fetchAfterDate = user.fetchedAt;
        fetchAfterDate.setMinutes(fetchAfterDate.getMinutes() - 10);
      } else {
        fetchAfterDate = null;
      }
      const result = await fetchAllEmails(auth, fetchAfterDate ? fetchAfterDate.toISOString() : null);
      const emails = result?.emails || [];
      const emailsWithAttachments = result?.emailsWithAttachments || [];


      if (!Array.isArray(emails)) {
        throw new Error('Expected emails to be an array');
      }
      const roles = await Role.findAll();
      for (const { email, attachmentPaths } of emailsWithAttachments) {
        await saveEmailToDatabase(email, fetchAfterDate, user.id, attachmentPaths);
        newEmail = 1;
        for (const role of roles) {
          const whenConditions = role.when;
          console.log("000000000000000000000000", whenConditions)
          const labelMatches = whenConditions.labelIds
            ? email.labels && email.labels.includes(whenConditions.labelIds)
            : true;

          const subjectMatches = whenConditions.subject
            ? email.subject && email.subject.includes(whenConditions.subject)
            : true;

          const userIdMatches = email.gmailUserId === whenConditions.gmailUserId;

          if (labelMatches && subjectMatches && userIdMatches) {

            const boardJson = role.condition
            const board = JSON.parse(boardJson);


            const boardId = board.boardId;
            const boardListId = board.boardListId;
            console.log("kkkkkkkkkkkkkkkkkk", boardId, boardListId)
            const userId = JSON.parse(role.action).userId;
            console.log("================", userId)

            const threadId = email.threadId;
            const taskPayload = {
              gmailMessageId: threadId,
              boardId: boardId,
              boardListId: boardListId,
              userId: userId,
            };
            console.log("333333333333333333333333333333", taskPayload)
            const taskController = require('../controllers/task.controller');
            // taskController

            await taskController.createTask({ body: taskPayload }, { status: (code) => ({ json: (response) => console.log(response) }) });

            console.log('Task created successfully based on role.');
            newEmailCreated = true;
          }
        }
      }

      email.push('--foo_bar_baz--');

      const base64EncodedEmail = Buffer.from(email.join('\n'))
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      const gmailResponse = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: base64EncodedEmail,
        },
      });
      return gmailResponse.data;
    } catch (err) {
      console.error(`Error sending email for client ${client.client_id}:`, err);
    }
  }
}

async function getEmailFromAuth(auth) {
  try {
    const gmail = google.gmail({ version: 'v1', auth });
    const profile = await gmail.users.getProfile({ userId: 'me' });
    return profile.data.emailAddress;
  } catch (error) {
    console.error('Error fetching email from auth:', error);
  }
}
// this is use to save the reply of the original mail
async function saveRepliesToDatabase(threadId, messageId, auth, attachmentPaths) {

  try {
    const gmailClient = google.gmail({ version: 'v1', auth });
    const thread = await gmailClient.users.threads.get({
      userId: 'me',
      id: threadId,
      auth
    });


    const existingThread = await Email.findOne({ where: { gmailMessageId: threadId } });
    if (!existingThread) {
      return;
    }


    const replies = thread.data.messages.filter((msg) => {
      const headers = msg.payload.headers;
      const inReplyToHeader = headers.find(header => header.name === 'In-Reply-To');
      return inReplyToHeader && msg.id !== messageId;
    });


    for (const reply of replies) {
      const savedReply = await SubEmail.findOne({ where: { subThreadId: reply.id } });
      if (savedReply) {
        continue;
      }

      const subject = reply.payload.headers.find(header => header.name === 'Subject')?.value || '';
      const body = reply.payload.parts?.[0]?.body?.data
        ? Buffer.from(reply.payload.parts[0].body.data, 'base64').toString()
        : '';

      const headers = reply.payload.headers;
      const senderHeader = headers.find(header => header.name === 'From');
      const receiverHeader = headers.find(header => header.name === 'To');

      const sender = senderHeader ? senderHeader.value : '';
      const receiver = receiverHeader ? receiverHeader.value : '';
      let name = '';
      if (receiverHeader) {
        const nameMatch = receiverHeader.value.match(/"(.*?)"/);
        name = nameMatch ? nameMatch[1] : receiverHeader.value.split('<')[0].trim();
      }

      const subEmail = await SubEmail.create({
        threadId: threadId,
        subThreadId: reply.id,
        subject: subject,
        body: body,
        sender: sender,
        receiver: receiver,
        name: name,
        attachmentPaths: attachmentPaths.join(',').length > 0 ? attachmentPaths : null,
      });

    }
    existingThread.updateAtEmail = new Date();
    await existingThread.save();
    existingThread.fetchedAt = new Date();
    await existingThread.save();
  } catch (error) {
    console.error('Error saving replies to database:', error);
  }
}
//this function is use to send reply on same mail thread 
async function replyToEmail(threadId, sender, receiver, subject, body, attachmentPaths) {
  try {
    const clients = await authorize();

    let thread = null;
    let gmailClient = null;
    let matchedCredential = null;

    console.log('Attachment Paths:', attachmentPaths);
    if (!Array.isArray(attachmentPaths)) {
      attachmentPaths = attachmentPaths ? [attachmentPaths] : [];
    }

    // Iterate over the fetched clients
    for (const client of clients) {
      const gmail = google.gmail({ version: 'v1', auth: client });

      try {
        // Fetch the original thread to get its details
        thread = await gmail.users.threads.get({
          userId: 'me',
          id: threadId
        });

        if (thread && thread.data) {
          gmailClient = gmail;
          matchedCredential = client; // Keep track of the matched client
          break; // Stop searching once we find a valid client
        }
      } catch (error) {
        if (error.code === 404) {
          // Thread not found, continue to the next account
        } else {
          console.error(`Error fetching thread:`, error);
          continue;
        }
      }
    }
    let messageIdHeader = null;

    // Searching for Message-ID in all messages
    for (const message of thread.data.messages) {
      const headers = message.payload.headers;

      // Find the Message-ID header (case insensitive)
      messageIdHeader = headers.find(h => h.name.toLowerCase() === 'message-id');
      if (messageIdHeader) break;  // Exit loop if found
    }

    if (!messageIdHeader) {
      throw new Error('Message-ID header not found in the original thread');
    }

    const originalMessageId = messageIdHeader.value; // Use the found value
    if (!gmailClient || !thread) {
      throw new Error(`Thread with ID ${threadId} not found in any of the Gmail accounts.`);
    }

    // Build the email content
    const emailLines = [
      `From: ${sender}`,
      `To: ${receiver}`,
      `Subject: ${subject || thread.data.messages[0].payload.headers.find(h => h.name === 'Subject').value}`,
      'In-Reply-To: ' + originalMessageId,
      'References: ' + originalMessageId,
      'MIME-Version: 1.0',
    ];

    if (attachmentPaths.length > 0) {
      emailLines.push('Content-Type: multipart/mixed; boundary="foo_bar_baz"', '', '--foo_bar_baz');
      emailLines.push('Content-Type: text/plain; charset="UTF-8"', '', body);

      const attachments = await Promise.all(attachmentPaths.map(async (filePath) => {
        const fileName = path.basename(filePath);
        const mimeType = mime.lookup(filePath) || 'application/octet-stream'; // Default to a binary file if MIME type can't be determined
        const attachment = await fs.readFile(filePath);
        const base64Attachment = attachment.toString('base64');
        return [
          '--foo_bar_baz',
          `Content-Type: ${mimeType}; name="${fileName}"`,
          'Content-Transfer-Encoding: base64',
          `Content-Disposition: attachment; filename="${fileName}"`,
          '',
          base64Attachment,
          ''
        ];
      }));

      emailLines.push(...attachments.flat(), '--foo_bar_baz--');
    } else {
      emailLines.push('Content-Type: text/plain; charset="UTF-8"', '', body);
    }

    // Log the final email content for debugging
    console.log('Final Email Content:', emailLines.join('\n'));

    const email = emailLines.join('\n');
    const base64EncodedEmail = Buffer.from(email)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Send the email
    const response = await gmailClient.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: base64EncodedEmail,
        threadId: threadId
      }
    });

    // Store the email in your database
    await SubEmail.create({
      threadId: threadId,
      sender: sender,
      receiver: receiver,
      subject: subject || thread.data.messages[0].payload.headers.find(h => h.name === 'Subject').value,
      body: body,
      attachmentPaths: attachmentPaths.length > 0 ? attachmentPaths.map(att => path.basename(att)).join(', ') : null,
      messageId: response.data.id
    });

    return response;
  } catch (error) {
    console.error('Error in replyToEmail function:', error);
    throw error;
  }
}
//this function is use to get the mail with the threadId
const getEmailById = async (gmailMessageId) => {
  try {
    const email = await Email.findOne({
      where: { gmailMessageId },
      include: [{ model: SubEmail }],
    });

    if (!email) {
      throw new Error('Email not found');
    }

    let contactIds = email.contactId ? JSON.parse(email.contactId) : [];

    if (!Array.isArray(contactIds)) {
      contactIds = contactIds.split(',').map(id => id.trim());
    }

    const chats = await Chat.findAll({
      where: {
        contactId: {
          [Op.in]: contactIds,
        },
      },
    });

    return { ...email.toJSON(), chats };
  } catch (error) {
    throw new Error(`Error retrieving email: ${error.message}`);
  }
};

async function sendPendingEmails() {
  try {
    const pendingEmails = await Task.findAll({
      where: {
        status: false,
      },
      order: [['createdAt', 'ASC']],
    });

    const auth = await authorize();

    for (const task of pendingEmails) {
      const email = await getEmailById(task.gmailMessageId);
      const attachmentPaths = email.attachmentPaths ? email.attachmentPaths[0] : null;

      await sendEmail1(auth, email.sentTo, email.subject, email.body, attachmentPaths);
      await task.update({ status: true });

    }
  } catch (error) {
    console.error('Error sending pending emails:', error);
  }
}

function startProcessing() {
  setInterval(async () => {
    await sendPendingEmails();
  }, 15 * 60 * 1000);
}
//fetch the count of the mail 
async function fetchCredentialsCount() {
  try {
    // Fetch credentials and tokens from the database
    const credentials = await G_Credential.findAll();
    const tokens = await G_Token.findAll();

    // Map credentials and tokens to the client_id
    const credentialKeys = credentials.map(cred => cred.client_id);
    const tokenKeys = tokens.map(token => token.client_id);

    // Return the count of credentials and tokens
    return {
      credentialCount: credentialKeys.length,
      tokenCount: tokenKeys.length,
    };
  } catch (err) {
    console.error('Error fetching credentials count:', err);
    throw err;
  }
}
startProcessing();






async function requestNewAuthorization(credential, req, res) {
  try {
    if (!credential.redirect_uris || !credential.redirect_uris.length) {
      throw new Error(`Missing redirect URIs for client_id: ${credential.client_id}`);
    }

    const redirectUri = JSON.parse(credential.redirect_uris)[0];
    console.log("Redirect URI:", redirectUri);

    const oauth2Client = new google.auth.OAuth2(
      credential.client_id,
      credential.client_secret,
      redirectUri
    );

    // Append client_id as a query parameter in the authUrl
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      state: JSON.stringify({ client_id: credential.client_id })  // Add client_id to the state
    });

    console.log('Authorize this app by visiting this URL:', authUrl);

    // Redirect the user to the auth URL
    res.redirect(authUrl);

  } catch (error) {
    console.error('Error in generating authorization URL:', error);
    return res.status(500).send('Error in generating authorization URL');
  }
}



module.exports = {
  authorize,
  listLabels,
  saveEmailToDatabase,
  replyToEmail,
  sendEmail1,
  getEmailById,
  sendPendingEmails,
  fetchCredentialsCount,
  getEmailFromAuth,
  saveAttachments,
  processRulesAndCreateTasks,
  requestNewAuthorization,
  saveOrUpdateTokens,
  saveRepliesToDatabase
};