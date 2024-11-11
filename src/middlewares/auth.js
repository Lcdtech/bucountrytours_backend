const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');
const logger = require('../config/logger');
const { UserGroup } = require('../models');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  const dbUser = await UserGroup.findByPk(user.id);
  if (!dbUser) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'User not found'));
  }

  if (user.role === 'admin') {
    return resolve();
  }

  if (user.role === 'user') {
    const userIdFromParams = req.params.userId; 
    if (userIdFromParams !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden: You do not have access to this resource'));
    }
  }

  resolve();
};

const auth =
  (...requiredRights) =>
 async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
