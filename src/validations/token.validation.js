const Joi = require('joi');

const createTokenSchema = Joi.object({
  type: Joi.string().valid('authorized_user').required(),
  client_id: Joi.string().required(),
  client_secret: Joi.string().required(),
  refresh_token: Joi.string().required(),
  access_token: Joi.string().required(),
  token_type: Joi.string().required(),
  token_status: Joi.string().required(),
  messageId: Joi.string().optional()
});

module.exports = {
  createTokenSchema
};
