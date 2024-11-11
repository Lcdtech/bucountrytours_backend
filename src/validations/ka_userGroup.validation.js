const Joi = require('joi');

const createKa_bu4Schema = Joi.object({
    image: Joi.string().allow(null), 
    role: Joi.string().allow(null),
});
const updateKa_bu4 = Joi.object({
    image: Joi.string().optional(), 
    role: Joi.string().optional(),
});

module.exports = { createKa_bu4Schema,updateKa_bu4 };
