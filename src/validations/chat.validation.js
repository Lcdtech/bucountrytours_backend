const Joi = require('joi');

const sendMessage = {
  body: Joi.object().keys({
    contactId: Joi.number().integer().optional(),
    messageSendBy: Joi.string().required(),
    messageRecivedBy: Joi.string().required(),
    message: Joi.string().required(),
    lastSeen: Joi.date().optional(), 
    attachment: Joi.string().optional() 
  })
};

module.exports = {
  sendMessage
};
