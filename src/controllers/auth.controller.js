const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService, userService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send({ user });
});
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const generatePassword = catchAsync(async (req, res) => {
  const password = await bcrypt.hash(req.query.password, 8);
  res.send({ password });
});



const getAllUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const email = req.query.email || '';

    const { count, users } = await userService.getAllUser(page, limit, email);

    res.status(200).json({
      status: 'success',
      data: {
        total: count,
        page,
        limit,
        users,
      },
    });
  } catch (error) {
    console.error('Error in getAllUser controller:', error); 
    res.status(500).json({
      status: 'error',
      message: 'Error fetching users',
    });
  }
};
const getUserById = async (req, res) => {
  try {
      const id = req.params.id;
      const user = await userService.getUserById(id);
      res.status(200).json(user);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const UserData = req.body;
  try {
    const updatedUser = await userService.updateUser(id, UserData);
    res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating User',
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await userService.deleteUserById(id);

    if (result) {
      return res.status(200).json({ message: 'User deleted successfully.' });
    } else {
      return res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  generatePassword,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser
};
