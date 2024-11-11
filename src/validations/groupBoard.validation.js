const Joi = require('joi');

const creategroupBoardSchema = Joi.object({
    boardId: Joi.string().guid({ version: 'uuidv4' }).allow(null), 
    groupUserId: Joi.string().guid({ version: 'uuidv4' }).allow(null), 
    boardListId: Joi.array().items(Joi.string().guid({ version: 'uuidv4' })).default([]),
    permissions: Joi.array().items(Joi.string().guid({ version: 'uuidv4' })).default([])
});
const updategroupBoardSchema = Joi.object({
    boardId: Joi.string().guid({ version: 'uuidv4' }).allow(null),
    groupUserId: Joi.string().guid({ version: 'uuidv4' }).allow(null), 
    boardListId: Joi.array().items(Joi.string().guid({ version: 'uuidv4' })).default([]) ,
    permissions: Joi.array().items(Joi.string().guid({ version: 'uuidv4' })).default([])
});
module.exports = {
    creategroupBoardSchema,
    updategroupBoardSchema
};
