const Joi = require('joi');

const createKa_bu4Schema = Joi.object({
    image: Joi.string().allow(null), 
    name: Joi.string().allow(null),
    email: Joi.string().allow(null),
    password: Joi.string().allow(null),
    role: Joi.string().allow(null),
});
const updateKa_bu4 = Joi.object({
    image: Joi.string().optional(), 
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    password: Joi.string().optional(),
    role: Joi.string().optional(),

});

module.exports = { createKa_bu4Schema,updateKa_bu4 };
