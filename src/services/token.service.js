const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');
const {Token}  = require('../models');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

const generateToken = (userId, role, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    role,

    iat: moment().unix(),
    exp: expires.unix(),
    type
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, role, expires, type, blacklisted = false) => {
  console.log("Token Data:", {
    token,
    user: userId,
    role,
    expires: expires.toDate(),
    type,
    blacklisted
  });

  try {
    const tokenDoc = await Token.create({
      token,
      user: userId,
      role,
      expires: expires.toDate(),
      type,
      blacklisted
    });
    return tokenDoc;
  } catch (error) {
    console.error("Error saving token:", error);
    throw error;
  }
};

const verifyToken = async (token, type) => {
  
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({ where: { token, user: payload.sub, blacklisted: false } });
  
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, user.role, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, user.role, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, user.id, user.role, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate()
    }
  };
};


const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const expires = moment().add(10, 'minutes').toISOString();

  const resetPasswordToken = generateToken(user.id, user.role, expires, tokenTypes.RESET_PASSWORD);
  await saveTokenForForget(resetPasswordToken, user.id, expires, 'resetPassword');
  return resetPasswordToken;
};


module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken
};