const Joi = require('joi');

const createCredentialSchema = Joi.object({
  client_id: Joi.string().required(),
  project_id: Joi.string().required(),
  auth_uri: Joi.string().required(),
  token_uri: Joi.string().required(),
  auth_provider_x509_cert_url: Joi.string().required(),
  client_secret: Joi.string().required(),
  redirect_uris: Joi.array().required(),
  messageId: Joi.string().optional()
});

module.exports = {
  createCredentialSchema
};
