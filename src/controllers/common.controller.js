const catchAsync = require('../utils/catchAsync');
const { commonService, userService } = require('../services');

const { Email } = require('../models');

const createUsers = catchAsync(async (req, res) => {
  let query = req.body;
  const data = await commonService.createUser(query);

  if (data) {
    res.status(200).send({ message: 'user created successfully', status: 1 });
  } else {
    res.send({ message: 'user not created ', status: 0 });
  }
});

const getAll = catchAsync(async (req, res) => {
  let querry = req.body;
  const data = await commonService.getuserData(querry);
  res.send({ message: 'data fetched successfully', status: 1, data });
});

const saveUserSettings = catchAsync(async (req, res) => {
  const result = await userService.updateUserById(req);
  res.send(result);
});
const getUserSettings = catchAsync(async (req, res) => {
  const userId = req.user?.dataValues.id ? req.user.dataValues.id : 1;
  const result = await userService.getUserById(userId);
  res.send(result);
});

module.exports = {
  getAll,
  saveUserSettings,
  getUserSettings,
  createUsers
};
