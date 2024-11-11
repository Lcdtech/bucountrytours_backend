const Joi = require('joi');

const createKa_bu1Schema = Joi.object({
    image: Joi.string().allow(null), 
    title: Joi.string().allow(null),
    clientBudget: Joi.string().allow(null),
    columns: Joi.string().allow(null),
    startDate: Joi.string().allow(null),
    endDate: Joi.string().allow(null),
    language: Joi.string().allow(null),
    participants: Joi.string().allow(null),
    price: Joi.number().allow(null),
    prospect: Joi.string().allow(null),
    verificationCode: Joi.number().allow(null),
    locationGroup: Joi.string().allow(null),
});
const updateKa_bu1 = Joi.object({
    image: Joi.string().optional(), 
    title: Joi.string().optional(),
    clientBudget: Joi.string().optional(),
    columns: Joi.string().optional(),
    startDate: Joi.string().optional(),
    endDate: Joi.string().optional(),
    language: Joi.string().optional(),
    participants: Joi.string().optional(),
    price: Joi.number().optional(),
    prospect: Joi.string().optional(),
    verificationCode: Joi.number().optional(),
    locationGroup: Joi.string().optional(),
    
});

module.exports = { createKa_bu1Schema,updateKa_bu1 };
