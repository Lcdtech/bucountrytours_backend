const Joi = require('joi');

const createRuleSchema = Joi.object({
    type: Joi.string().required(),  
    name: Joi.string().required(), 
    when: Joi.string().allow(null),
    condition: Joi.string().allow(null),
    then: Joi.string().allow(null),
    status: Joi.boolean().allow(null),
});
const updateRule = Joi.object({
    status: Joi.boolean().required(),
});
module.exports = { createRuleSchema,updateRule };
