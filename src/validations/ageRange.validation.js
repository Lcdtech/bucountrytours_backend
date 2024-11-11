const Joi = require('joi');
const { start } = require('pm2');

const createKa_bu3Schema = Joi.object({
    image: Joi.string().allow(null), 
    title: Joi.string().allow(null),
    startAge: Joi.number().allow(null),
    endAge: Joi.number().allow(null),
    groupId: Joi.string().allow(null), 
});
const updateKa_bu3 = Joi.object({
    image: Joi.string().optional(), 
    title: Joi.string().optional(),
    startAge: Joi.number().optional(),
    endAge: Joi.number().optional(),
    groupId: Joi.string().optional(),
});

module.exports = { createKa_bu3Schema,updateKa_bu3 };
