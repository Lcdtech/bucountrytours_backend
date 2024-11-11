const Joi = require('joi');

const createBoardList = Joi.object({
    coloum: Joi.string().required(), 
    boardId: Joi.number().optional(), 
    sequence: Joi.number().optional(), 
    status: Joi.boolean().optional()
});
const updateBoardList = Joi.object({
    coloum: Joi.string().required(), 
    boardId: Joi.number().optional(), 
    sequence: Joi.number().optional(), 
    status: Joi.boolean().optional()
});
const updateSequence = Joi.object({
    coloum: Joi.string().required(), 
    sequence: Joi.number().required(), 
});


module.exports = { createBoardList,updateBoardList,updateSequence };
