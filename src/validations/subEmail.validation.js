const Joi = require('joi');

const sendSubEmailSchema = Joi.object({
  subject: Joi.string().optional(),
  body: Joi.string().required(),
  attachmentPaths: Joi.string().optional(),
  gmailStatus:Joi.string().valid('TO DO', 'IN PROGRESS', 'DEV DONE', 'QA DONE').optional(),
  threadId: Joi.string().required(), 
});
const updateStatusSubEmail = Joi.object({
  gmailStatus:Joi.string().valid('TO DO', 'IN PROGRESS', 'DEV DONE', 'QA DONE').optional(),
});

module.exports = { sendSubEmailSchema,updateStatusSubEmail };
