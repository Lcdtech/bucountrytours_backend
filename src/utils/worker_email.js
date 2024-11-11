const { workerData } = require('worker_threads');
const { google } = require('googleapis');
const cron = require('node-cron');
const gmail = google.gmail('v1');
const {  GmailUser, G_Credential, G_Token} = require('../models');
const { authenticate } = require('@google-cloud/local-auth');
const { PubSub } = require('@google-cloud/pubsub');
const pubSubClient = new PubSub();
const Sequelize = require('sequelize');
const { getRandomColor } = require('../utils/colorUtils');
const { io } = require('../app')
const { emailService } = require('../services')

// this function is use to loadcreadentail and convert into json
  async function loadSavedCredentialsIfExist1() {
    try {
        const [credentials, tokens] = await Promise.all([
            G_Credential.findAll(),
            G_Token.findAll()
        ]);
  
        const tokenMap = {};
        tokens.forEach(token => {
            tokenMap[token.client_id] = token;
        });
  
        const resultArray = [];
  
        credentials.forEach((cred, index) => {
            const token = tokenMap[cred.client_id];
            if (token) {
              const result = {};
                result[`web${index + 1}`] = {
                    client_id: cred.client_id,
                    project_id: cred.project_id,
                    auth_uri: cred.auth_uri,  
                    token_uri: cred.token_uri, 
                    auth_provider_x509_cert_url: cred.auth_provider_x509_cert_url,  
                    client_secret: cred.client_secret,
                    redirect_uris: Array.isArray(cred.redirect_uris) ? cred.redirect_uris : [cred.redirect_uris],
                    messageId: token.messageId 
                };
  
                result[`token${index + 1}`] = {
                    type: "authorized_user",
                    client_id: cred.client_id,
                    client_secret: cred.client_secret,
                    refresh_token: token.refresh_token,
                    token_type: "Bearer",
                    messageId: token.messageId
                };
                resultArray.push(result);
  
            }
        });
        return resultArray;
    } catch (err) {
        console.error('Error fetching credentials and tokens:', err);
        throw err;
    }
  }
  //this function use to loadcreadentail and fetch the mail according to fetchemail accorfing to condition
  async function fetchAndSaveEmails() {
    try {
      // Use the dynamic function to fetch credentials and tokens
      const credentials = await loadSavedCredentialsIfExist1();
      
      let newEmail = 0;
      let newReply = 0;
      
      // Loop through the fetched credentials
      for (let index = 0; index < credentials.length; index++) {
        const credKey = `web${index+1}`;
        const tokenKey = `token${index+1}`;
        
  
       
        const cred = credentials[index][credKey];
        const token = credentials[index][tokenKey];
        if (!cred || !token || !token.status ==1 ) {
          console.error(`Missing or invalid credentials or tokens for index ${index}`);
        }
  
        // Authorize using the loaded credentials and tokens
        const auth = new google.auth.OAuth2(cred.client_id, cred.client_secret, cred.redirect_uris[0]);
        auth.setCredentials({
          refresh_token: token.refresh_token
        });
        try {
          const profile = await gmail.users.getProfile({ auth, userId: 'me' });
          const email = profile.data.emailAddress;
          const user = await GmailUser.findOne({ where: { email } });
  
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
  
          // Fetch all emails
          const result = await fetchAllEmails(auth, fetchAfterDate ? fetchAfterDate.toISOString() : null);
          const emails = result?.emails || [];
          const emailsWithAttachments = result?.emailsWithAttachments || [];
  
          if (!Array.isArray(emails)) {
            throw new Error('Expected emails to be an array');
          }
  
          // Save emails with attachments
          for (const { email, attachmentPaths } of emailsWithAttachments) {
            await emailService.saveEmailToDatabase(email, fetchAfterDate, user.id, attachmentPaths);
            newEmail = 1;
          }
  
          // Save replies to the database
          for (const { email, attachmentPaths } of emailsWithAttachments) {
            await emailService.saveRepliesToDatabase(email.threadId, email.id, auth, attachmentPaths);
            newReply = 1;
          }
  
          // Update user with fetchedAt timestamp
          await GmailUser.update(
            { fetchedAt: new Date() },
            {
              where: {
                email: user.email,
              }
            }
          );
  
          // Emit event if new emails or replies were saved
          if (newEmail !== 0 || newReply !== 0) {
            const { io } = require('../index');
            io.emit('emailSaved', {});
          }
        } catch (authError) {
          if (authError?.response?.data?.error === 'invalid_grant') {
              console.error('Invalid refresh token, user needs to re-authenticate.');    
            // Update G_Token model's token_status to false
            await G_Token.update(
              {
                status: 0,
                token_status: "token is Unauthorized" // Update both fields here
            },
            {
                where: { refresh_token: token.refresh_token }
            }
            );
  
            // Update G_Credential model's status to false
            await G_Credential.update(
              { status: 0 },
              { where: { client_id: cred.client_id } }
            );
          } else {
            console.error('Error fetching profile:', authError);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching and saving emails:', error);
    }
  }
  //this function will fetch the mail and use to push in above function 
  async function fetchAllEmails(auth, after, before) {
    const gmail = google.gmail({ version: 'v1', auth });
    let nextPageToken = null;
    let emails = [];
    let emailsWithAttachments = [];
    const query = [];
  
    if (after) query.push(`after:${Math.floor(new Date(after).getTime() / 1000)}`);
    if (before) query.push(`before:${Math.floor(new Date(before).getTime() / 1000)}`);
  
    do {
      const res = await gmail.users.messages.list({
        userId: 'me',
        q: query.join(' '),
        maxResults: 100,
        pageToken: nextPageToken,
      });
  
      const messages = res.data.messages;
      nextPageToken = res.data.nextPageToken;
  
      if (messages && messages.length > 0) {
        for (const message of messages) {
          const msg = await gmail.users.messages.get({
            userId: 'me',
            id: message.id,
          });
  
          emails.push(msg.data);
          const attachmentPaths = await emailService.saveAttachments(msg.data, message.id, auth);
  
          if (!Array.isArray(attachmentPaths)) {
            throw new TypeError('attachmentPaths should be an array');
          }
  
          emailsWithAttachments.push({ email: msg.data, attachmentPaths });
        }
      }
    } while (nextPageToken);
  
    return { emails, emailsWithAttachments };
  }
  //this function is use to use to fetch the how many gmail account are connected with this code 
  async function fetchEmailCredentialsAndStoreUser(io) {
    try {
      // Fetch all credentials and tokens
      const credentials = await G_Credential.findAll();
      const tokens = await G_Token.findAll();
  
      const tokenMap = {};
      tokens.forEach(token => {
        tokenMap[token.client_id] = token;
      });
  
      for (const credential of credentials) {
        const token = tokenMap[credential.client_id];
        if (!token) {
          console.error(`No token found for client_id: ${credential.client_id}`);
          continue;
        }
  
        // Create OAuth2 client
        const client = new google.auth.OAuth2(
          credential.client_id,
          credential.client_secret,
          credential.redirect_uris[0]
        );
        client.setCredentials({ refresh_token: token.refresh_token });
  
        const gmail = google.gmail({ version: 'v1', auth: client });
  
        // Fetch Gmail profile
        const profile = await gmail.users.getProfile({ userId: 'me' });
        const email = profile.data.emailAddress;
        const name = email.split('@')[0];
  
        // Check if user already exists
        const existingUser = await GmailUser.findOne({ where: { email } });
  
        if (!existingUser) {
          // Create new user
          const newUser = await GmailUser.create({
            email,
            name,
            colour: getRandomColor(),
          });
  
          // Emit event
          io.emit('newUserStored', newUser);
        }
      }
    } catch (error) {
      console.error('Error fetching email credentials and storing user:', error);
    }
  }
// this function is used to send the notification in using webhook
  async function fetchAndNotifyEmails() {
    try {
      const auth = await emailService.authorize();
      const emails = await fetchAllEmails(auth);
  
      for (const email of emails) {
        await saveEmailToDatabase(email);
  
        const topicNameOrId = 'projects/ishika-428207/topics/ishika-keshari';
  
        const data = JSON.stringify({
          emailId: email.id,
          subject: email.subject,
          from: email.from,
          body: email.body,
          status: 'Email Fetched'
        });
        const queryString = new URLSearchParams(data).toString();
  
        await publishMessageWithCustomAttributes(topicNameOrId, queryString);
      }
  
    } catch (error) {
      console.error('Error in fetchAndNotifyEmails:', error);
      throw error;
    }
  }

async function sendEmailWithNotification(sentBy, recipient, subject, message, attachmentPaths) {
    try {
      const emailResponse = await emailService.sendEmail1(sentBy, recipient, subject, message, attachmentPaths);
  
      const topicNameOrId = 'projects/ishika-428207/topics/ishika-keshari';
      const data = JSON.stringify({
        sentBy,
        recipient,
        subject,
        status: 'Email Sent',
        emailResponse
      });
  
      await publishMessageWithCustomAttributes(topicNameOrId, data);
  
      return emailResponse;
    } catch (error) {
      console.error('Error in sendEmailWithNotification:', error);
      throw error;
    }
  }
  cron.schedule(`*/${process.env.CRON_MIN} * * * *`, async () => {
    console.log('Running scheduled email fetch...');
    await fetchEmailCredentialsAndStoreUser(io);
    await fetchAndSaveEmails();
  });
  module.exports = {
    fetchEmailCredentialsAndStoreUser,
    fetchAndSaveEmails,
    fetchAllEmails,
    loadSavedCredentialsIfExist1,
    fetchAndNotifyEmails,
    sendEmailWithNotification
  }