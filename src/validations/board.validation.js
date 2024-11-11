const Joi = require('joi');

const createBoardSchema = Joi.object({
    boardName: Joi.string().required(), 
 
});
const updateBoard = Joi.object({
    boardName: Joi.string().required(), 
    status: Joi.boolean().optional(),
});

module.exports = { createBoardSchema,updateBoard };
