const Joi = require('joi');

const sendEmailSchema = Joi.object({
  sentTo: Joi.string().email().optional(), 
  sentBy: Joi.string().email().required(),
  subject: Joi.string().required(),
  body: Joi.string().required(),
  attachmentPaths: Joi.string().optional(),
});
const updateStatusEmail = Joi.object({
});

const updatedMessageRead = Joi.object({
  messageRead:Joi.string().valid('read', 'unread').optional(),
});

const sendEmail = Joi.object({
  sentTo: Joi.string().email().optional(), 
  sentBy: Joi.string().email().required(),
  subject: Joi.string().required(),
  body: Joi.string().required(),
  attachmentPaths: Joi.string().optional(),
});

const updateGmailUser = Joi.object({
  colour:Joi.string().optional(),
});

const updatedEmailForTask = Joi.object({
  isTaskCreated: Joi.boolean().optional(),
});
const updateEmail = Joi.object({
  contactId: Joi.string().required()
  
});
module.exports = { sendEmailSchema,updateStatusEmail,sendEmail ,updatedMessageRead, updateGmailUser,updatedEmailForTask,updateEmail};
