const Joi = require('joi');

const creategroupUserSchema = Joi.object({
    name: Joi.string().max(255).optional().allow(null),
    userId: Joi.array().items(Joi.string()).optional().allow(null),
    status: Joi.boolean().optional()
});
const updategroupUserSchema = Joi.object({
    name: Joi.string().max(255).optional().allow(null),
    userId: Joi.array().items(Joi.string()).optional().allow(null),
    status: Joi.boolean().optional()
});
module.exports = {
    creategroupUserSchema,
    updategroupUserSchema
};
