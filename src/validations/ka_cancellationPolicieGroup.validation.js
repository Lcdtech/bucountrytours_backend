const Joi = require('joi');

const createKa_bu1Schema = Joi.object({
    title: Joi.string().allow(null),
});
const updateKa_bu1 = Joi.object({
    title: Joi.string().optional(),
});

module.exports = { createKa_bu1Schema,updateKa_bu1 };