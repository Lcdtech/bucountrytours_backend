const Joi = require('joi');

const createAddPropertySchema = Joi.object({
    type: Joi.string().required(), 
    propertyName: Joi.string().required(),
 
});
const updateAddProprty = Joi.object({
    type: Joi.string().required(), 
    propertyName: Joi.string().required(),
});

module.exports = { createAddPropertySchema,updateAddProprty };
