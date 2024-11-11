const Joi = require('joi');

const createTemplate = Joi.object({
    sentTo: Joi.array().items(Joi.string().email()).optional(),  
    sentBy: Joi.string().email().optional(),
    subject: Joi.string().required(),
    body: Joi.string().required(),
    name: Joi.string().optional(),
    attachmentPaths: Joi.string().optional(),
    status: Joi.boolean().optional(),
});

const updateTemplate = Joi.object({
    sentTo: Joi.array().items(Joi.string().email()).optional(),  
    sentBy: Joi.string().email().optional(),
    subject: Joi.string().optional(),
    body: Joi.string().optional(),
    name: Joi.string().optional(),
    attachmentPaths: Joi.string().optional(),
    status: Joi.boolean().optional(),
})

module.exports = {
    createTemplate,
    updateTemplate
};
