const { emailService, emailDbService, taskService } = require('../services');
const cron = require('node-cron');
const { Email } = require('../models');

async function getLabels(req, res) {
  try {
    const auth = await emailService.authorize();
    const labels = await emailService.listLabels(auth);
    res.status(200).json(labels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getEmailsByDate(req, res) {
  const { after, before, limit = 10, offset = 0, gmailUserId, subject, labels } = req.query;
  const { boardId } = req.params;

  if (!boardId) {
    return res.status(400).json({ error: 'boardId query parameter is required' });
  }

  try {
    const auth = await emailService.authorize();
    const emails = await emailDbService.fetchEmailsFromDatabase({
      auth, after, before, limit: parseInt(limit), offset: parseInt(offset), gmailUserId, boardId, labels, subject
    });
    res.status(200).json(emails);
  } catch (error) {
    if (error.message === 'No Gmail User IDs found for the provided boardId') {
      res.status(204).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
}

async function sendEmail(req, res) {
  const { sentTo, sentBy, subject, body, attachmentPaths } = req.body;
  try {
    const response = await emailService.sendEmail1(sentBy, sentTo, subject, body, attachmentPaths);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: error.message });
  }
}

async function fetchAndSaveEmails() {
  const auth = await emailService.authorize();
  const after = new Date();
  const before = new Date();
  const emails = await emailService.fetchAllEmails(auth, after, before);

  for (const email of emails) {
    await emailService.saveEmailToDatabase(email, null, after);
  }
}

const updateStatusEmail = async (req, res) => {
  try {
    const { gmailMessageId } = req.params;
    const updateData = req.body;

    const updatedEmail = await emailDbService.updateStatusEmail(gmailMessageId, updateData);

    return res.status(200).json({
      success: true,
      message: 'Email status updated successfully',
      data: updatedEmail,
    });
  } catch (error) {
    console.error('Error updating email status:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const updatedMessageRead = async (req, res) => {
  try {
    const { gmailMessageId } = req.params;
    const updateData = req.body;

    const updatedEmail = await emailDbService.updatedMessageRead(gmailMessageId, updateData);

    return res.status(200).json({
      success: true,
      message: 'Email status updated successfully',
      data: updatedEmail,
    });
  } catch (error) {
    console.error('Error updating email status:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const getEmailBy = async (req, res) => {
  try {
    const { gmailMessageId } = req.params;
    if (!gmailMessageId) {
      return res.status(400).json({ message: 'gmailMessageId is required' });
    }

    const email = await emailService.getEmailById(gmailMessageId);
    res.status(200).json(email);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteEmail = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedEmail = await emailDbService.deleteEmailById(id);
    res.status(200).json({
      message: 'Email deleted successfully',
      data: deletedEmail,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Email not found',
      error: error.message,
    });
  }
};


const replyToEmail = async (req, res) => {
  const { sender, receiver, subject, body, attachmentPaths } = req.body;
  const threadId = req.params.id;
  try {
    const response = await emailService.replyToEmail(threadId, sender, receiver, subject, body, attachmentPaths);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error replying to email:', error);
    res.status(500).json({ error: error.message });
  }
};

const getAllDeletedMail = async (req, res) => {
  try {
    const deletedMails = await emailDbService.getAllDeletedMail();
    res.status(200).json(deletedMails);
  } catch (error) {
    console.error('Error fetching deleted mails:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateGmailUser = async (req, res) => {
  const id = req.params.id;
  const GmailUserData = req.body;
  try {
    const updatedGmailUser = await emailDbService.updateGmailUser(id, GmailUserData);
    res.status(200).json({
      message: 'GmailUser updated successfully',
      data: updatedGmailUser,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating GmailUser',
      error: error.message,
    });
  }
};

const getTheLinkedEmail = async (req, res) => {
  try {
    const linkedEmail = await emailDbService.getTheLinkedEmail();
    res.status(200).json(linkedEmail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updatedEmailForTask = async (req, res) => {
  try {
    const { gmailMessageId } = req.params;
    const updateData = req.body;

    const updatedEmail = await emailDbService.updatedEmailForTask(gmailMessageId, updateData);

    return res.status(200).json({
      success: true,
      message: 'Email status updated successfully',
      data: updatedEmail,
    });
  } catch (error) {
    console.error('Error updating email status:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

async function updateBoardId(req, res) {
  try {
    const { labels, gmailUserId, boardId } = req.body;
    if (!boardId) {
      return res.status(400).json({ message: 'boardId is required' });
    }

    const updatedRows = await emailDbService.updateBoardId({ labels, gmailUserId, boardId });

    if (updatedRows[0] === 0) {
      return res.status(404).json({ message: 'No emails found matching the criteria' });
    }

    res.status(200).json({ message: 'Board ID updated successfully', updatedRows: updatedRows[0] });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
}
const updateEmail = async (req, res) => {
  try {
    const { gmailMessageId } = req.params;
    const { contactId } = req.body;

    if (!gmailMessageId) {
      return res.status(400).json({ message: 'Gmail message ID is required' });
    }

    const updatedEmail = await emailDbService.updateEmail(gmailMessageId, { contactId });

    if (!updatedEmail) {
      return res.status(404).json({ message: 'Email not found' });
    }

    res.status(200).json({ message: 'Email updated successfully', email: updatedEmail });
  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const compose = async (req, res) => {
  const { sentTo, sentBy, subject, body, attachmentPaths, ...taskData } = req.body;

  try {
    const emailResponse = await emailService.sendEmail1(sentBy, sentTo, subject, body, attachmentPaths);
    await emailService.fetchAndSaveEmails();

    let emailDetails = { subject: null, name: null };
    const threadId = emailResponse.threadId || null;

    if (threadId) {
      const email = await emailService.getEmailById(threadId);
      emailDetails = {
        subject: email.subject,
        name: email.name,
      };
    }


    const newTaskData = {
      ...taskData,
      gmailMessageId: threadId,
      subject: emailDetails.subject || subject,
      name: emailDetails.name || taskData.name,
    };

    const task = await taskService.createTask(newTaskData);

    const messageIdToUpdate = threadId;
    if (messageIdToUpdate) {
      await emailDbService.updatedEmailForTask(messageIdToUpdate, { isTaskCreated: true });
    }


    res.status(201).json({
      message: 'Email sent and task created successfully',
      emailResponse,
      task,
      gmailMessageId: messageIdToUpdate,
    });

  } catch (error) {
    console.error('Error composing email and task:', error);

    if (error.name === 'ValidationError') {
      res.status(400).json({
        message: 'Validation error',
        error: error.message,
        details: error.errors,
      });
    } else {
      res.status(500).json({
        message: 'Error composing email and task',
        error: error.message,
      });
    }
  }
};

module.exports = {
  getLabels,
  getEmailsByDate,
  sendEmail,
  updateStatusEmail,
  deleteEmail,
  replyToEmail,
  getEmailBy,
  getAllDeletedMail,
  updatedMessageRead,
  updateGmailUser,
  getTheLinkedEmail,
  updatedEmailForTask,
  updateBoardId,
  updateEmail,
  compose
};