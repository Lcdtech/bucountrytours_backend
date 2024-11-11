const Joi = require('joi');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    role: Joi.string().optional(),
    name: Joi.string().optional(),
  })
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const generatePassword = {
  query: Joi.object().keys({
    password: Joi.string().required()
  })
};

const updateUser = Joi.object({
  permissions: Joi.array().items(Joi.object()).required(),
});

module.exports = {
  login,
  logout,
  refreshTokens,
  register,
  generatePassword,
  updateUser
};
