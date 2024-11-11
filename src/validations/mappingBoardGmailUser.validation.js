const Joi = require('joi');

const createMappingBoardGmailUserSchema = Joi.object({
  boardId: Joi.string().uuid().allow(null),
  boardListId: Joi.string().uuid().allow(null),
  gmailUserId: Joi.string().uuid().allow(null),
  permissionId: Joi.string().uuid().allow(null),
  labels: Joi.string().allow(null),
  status: Joi.boolean().allow(null),
});
const updateMappingBoardGmailUserSchema = Joi.object({
    boardId: Joi.string().uuid().allow(null),
    boardListId: Joi.string().uuid().allow(null),
    gmailUserId: Joi.string().uuid().allow(null),
    permissionId: Joi.string().uuid().allow(null),
    labels: Joi.string().allow(null),
    status: Joi.boolean().allow(null),
  });
  

module.exports = {
  createMappingBoardGmailUserSchema,
  updateMappingBoardGmailUserSchema
};
