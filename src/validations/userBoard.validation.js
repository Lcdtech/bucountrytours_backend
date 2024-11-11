const Joi = require('joi');

const createUserBoardSchema = Joi.object({
    boardId: Joi.string().guid({ version: 'uuidv4' }).optional().allow(null),
    userId: Joi.string().guid({ version: 'uuidv4' }).optional().allow(null),
    permissions: Joi.string().uuid().allow(null),
    boardListId: Joi.string().uuid().allow(null),
    status: Joi.boolean().optional(),
 
});
const updateUserBoardSchema = Joi.object({
    boardId: Joi.string().guid({ version: 'uuidv4' }).optional().allow(null),
    userId: Joi.string().guid({ version: 'uuidv4' }).optional().allow(null),
    permissions: Joi.string().uuid().allow(null),
    boardListId: Joi.string().uuid().allow(null),
    status: Joi.boolean().optional(),
});

module.exports = {
    createUserBoardSchema,
    updateUserBoardSchema
};