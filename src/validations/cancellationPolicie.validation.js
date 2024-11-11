const Joi = require('joi');

const createKa_bu4Schema = Joi.object({
    image: Joi.string().allow(null), 
    title: Joi.string().allow(null),
    rules: Joi.string().allow(null),
    groupId: Joi.string().allow(null),
});
const updateKa_bu4 = Joi.object({
    image: Joi.string().optional(), 
    title: Joi.string().optional(),
    rules: Joi.string().optional(),
    groupId: Joi.string().optional(),
});

module.exports = { createKa_bu4Schema,updateKa_bu4 };
