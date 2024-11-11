const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const tokenService = require('./token.service');
const userService = require('./usergroup.service');
const {Token} = require('../models');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const logger = require('../config/logger');

const loginUserWithEmailAndPassword = async (email, password) => {
  const userWithSecretFields = await userService.getUserWithSecretFields(email);
  
  const user = await userService.getUserByEmail(email);
  logger.info('message');
  if (!user || !(await bcrypt.compare(password, userWithSecretFields.dataValues.password))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Incorrect email or password');
  }
  return user;
};

const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    where: { token: refreshToken }
  });

return refreshTokenDoc;
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.destroy();
};

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    if (!resetPasswordTokenDoc) {
      throw new Error('Invalid or expired reset password token');
    }
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error('User not found');
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 8);
    const updatedUser = await userService.updateUserByID(user.id, { password: newHashedPassword });

    if (updatedUser) {
      return { message: 'Password reset successfully' };
    } else {
      throw new Error('Password reset failed');
    }
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message || 'Password reset failed in catch');
  }
};

const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const expires = moment().add(config.jwt.JWT_ACCESS_EXPIRATION_DAYS, 'days');
  const resetPasswordToken = generateToken(user.id, user.role, expires, tokenTypes.RESET_PASSWORD);
  await saveToken(resetPasswordToken, user.id, user.role, expires, tokenTypes.RESET_PASSWORD);
  return resetPasswordToken;
};


module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  generateResetPasswordToken
};