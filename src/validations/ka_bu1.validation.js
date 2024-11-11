const Joi = require('joi');

const createKa_bu1Schema = Joi.object({
    image: Joi.string().allow(null), 
    title: Joi.string().allow(null),
    groupId: Joi.string().allow(null), 
});
const updateKa_bu1 = Joi.object({
    image: Joi.string().optional(), 
    title: Joi.string().optional(),
    groupId: Joi.string().optional(),
});

module.exports = { createKa_bu1Schema,updateKa_bu1 };
