const { Email, User } = require('../models');
const { sendMail } = require('../services/email.service');
const cron = require('node-cron');
const fs = require('fs');
const catchAsync = require('../utils/catchAsync');

const createUser = async (query) => {
  try {
    const data = await User.create(query);

    return data;
  } catch (err) {
  }
};

const loginUser = async (data) => {
};
const getuserData = async (querry) => {
  const data = await User.findOne({
    where: {
      studentId: querry.studentId,
      phoneNumber: querry.phoneNumber,
      password: querry.password
    }
  });
  return data;
};

const getUserById = catchAsync(async (data) => {});

module.exports = {
  createUser,
  getuserData,
  loginUser,
  getUserById
};
