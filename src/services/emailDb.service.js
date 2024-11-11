const { google } = require('googleapis');
const gmail = google.gmail('v1');
const fs = require('fs').promises;
const path = require('path');
const { Email, Task, SubEmail, GmailUser, MappingBoardGmailUser } = require('../models');
const { authenticate } = require('@google-cloud/local-auth');
const mime = require('mime-types');
const cron = require('node-cron');
const { Op } = require('sequelize');
const { PubSub } = require('@google-cloud/pubsub');
const pubSubClient = new PubSub();
const Sequelize = require('sequelize');
const { getRandomColor } = require('../utils/colorUtils');
const dotenv = require('dotenv');
const { io } = require('../app')

const updatedMessageRead = async (gmailMessageId, updateData) => {
    try {
      const email = await Email.findOne({ where: { gmailMessageId } });
      if (!email) {
        throw new Error('Email not found');
      }
  
      const updatedEmail = await email.update(updateData);
      return updatedEmail;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateStatusEmail = async (gmailMessageId, updateData) => {
    try {
      const email = await Email.findOne({ where: { gmailMessageId } });
      if (!email) {
        throw new Error('Email not found');
      }
  
      const updatedEmail = await email.update(updateData);
      return updatedEmail;
    } catch (error) {
      throw new Error(error.message);
    }
  };


  async function fetchEmailsFromDatabase({ after, before, limit, offset, gmailUserId, boardId, labels, subject }) {
    try {
      const boardMapping = await MappingBoardGmailUser.findAll({
        where: {
          boardId,
          gmailUserId: {
            [Op.ne]: null,  
          },
        },
        attributes: ['gmailUserId'],
      });
      const boardGmailUserIds = boardMapping.map(mapping => mapping.gmailUserId);
      
  
      let gmailUserIdsArray = [];
     
  
      if (boardGmailUserIds.length === 0) {
        throw new Error('No Gmail User IDs found for the provided boardId');
      }

      const combinedGmailUserIds = boardGmailUserIds && boardGmailUserIds?.length > 0 && boardGmailUserIds[0].split(',');
      const queryOptions = {
        where: {
          status: true, isTaskCreated: false,
          gmailUserId: {
            [Op.in]: combinedGmailUserIds,  
          },
         
        },
        order: [['fetchedAt', 'DESC'], ['createdAtEmail', 'DESC']],
        limit: limit || 10,
        offset: offset || 0,
        include: [{ model: GmailUser }
        ]
      };
      if (after) {
        queryOptions.where.createdAt = { [Op.gte]: new Date(after) };
      }
  
      if (before) {
        queryOptions.where.createdAt = {
          ...queryOptions.where.createdAt,
          [Op.lte]: new Date(before),
        };
      }
      if (labels) {
        queryOptions.where.labels = {
          [Op.contains]: labels.split(',').map(label => label.trim())
        };
      }
      if (gmailUserId) {
        const gmailUserIdsArray = gmailUserId.split(',').map(id => id.trim());
  
        queryOptions.where.gmailUserId = {
          [Op.in]: gmailUserIdsArray
        };
      }
      if (subject) {
        queryOptions.where.subject = {
          [Op.like]: `%${subject.trim()}%` 
        };
      }
  
      const emails = await Email.findAll(queryOptions);
  
      const totalCount = await Email.count({ where: queryOptions.where });
  
      await Promise.all(emails.map(email => email.update({ fetchedAt: new Date() })));
  
      return {
        emails,
        totalCount,
      };
    } catch (error) {
      console.error('Error fetching emails from database:', error);
      throw error;
    }
  }

  const updateGmailUser = async (id, GmailUserData) => {
    try {
      const [updated] = await GmailUser.update(GmailUserData, {
        where: { id },
        returning: true,
      });
      if (updated === 0) {
        throw new Error('GmailUser not found');
      }
      const updatedGmailUser = await GmailUser.findByPk(id);
      return updatedGmailUser;
    } catch (error) {
      throw new Error('Error updating GmailUser: ' + error.message);
    }
  };

  const getTheLinkedEmail = async () => {
    try {
      const linkedEmail = await GmailUser.findAll({
        // include:{model:Email}
      });
  
      if (!linkedEmail) {
        throw new Error('No linked email found');
      }
  
      return linkedEmail;
    } catch (error) {
      throw new Error(`Failed to fetch the linked email: ${error.message}`);
    }
  };

  const updatedEmailForTask = async (gmailMessageId, updateData) => {
    try {
      const email = await Email.findOne({ where: { gmailMessageId } });
      if (!email) {
        throw new Error('Email not found');
      }
  
      const updatedEmail = await email.update(updateData);
      return updatedEmail;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  async function updateBoardId({ labels, gmailUserId, boardId }) {
    const whereConditions = {};
    if (labels && labels.length > 0) {
      whereConditions.labels = labels;  
    }
    
    if (gmailUserId) {
      whereConditions.gmailUserId = gmailUserId;
    }
  
    const updatedRows = await Email.update(
        { boardId },
        {
            where: whereConditions,
        }
    );
    return updatedRows; 
  };

  const deleteEmailById = async (id) => {
    try {
      const deletedEmail = await Email.findByPk(id);
  
      if (!deletedEmail) {
        throw new Error('Email not found');
      }
  
      await Email.update({ status: false }, {
        where: { id }
      });
  
      return deletedEmail;
    } catch (error) {
      throw new Error('Error deleting Email: ' + error.message);
    }
  };

  const getAllDeletedMail = async () => {
    try {
      const deletedMails = await Email.findAll({
        where: {
          status: false
        }
      });
      return deletedMails;
    } catch (error) {
      console.error('Error retrieving deleted mails from database:', error);
      throw new Error('Unable to fetch deleted mails');
    }
  };

  const updateEmail = async (gmailMessageId, updates) => {
    try {
        const email = await Email.findOne({ where: { gmailMessageId } });

        if (!email) {
            return null;
        }

        await email.update(updates);

        return email;
    } catch (error) {
        console.error('Error updating email:', error);
        throw error;
    }
};

  module.exports = {
    updatedMessageRead,
    updateStatusEmail,
    fetchEmailsFromDatabase,
    updateGmailUser,
    getTheLinkedEmail,
    updatedEmailForTask,
    updateBoardId,
    deleteEmailById,
    getAllDeletedMail,
    updateEmail,
  }