const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { User, Task, UserBoard, GroupBoard, GroupUser} = require('../models');
const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { Sequelize } = require('sequelize');

const getExistingEmais = async (email) => {
  logger.info(email);
  return User.findOne({ where: { email, status: true } });
};

const createUser = async (_userBody) => {
  const userBody = _userBody;
  if (await getExistingEmais(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, messages.EMAIL_ALREADY_EXISTS);
  }
  userBody.password = await bcrypt.hash(userBody.password, 8);
  return User.create(userBody);
};

const getUserByEmail = async (email) => {
  return User.findOne({
    where: { email, status: true }
  });
};
const getUserWithSecretFields = async (email) => {
  return User.scope('withSecretColumns').findOne({ where: { email } });
};
const getUserWithSecretFieldsById = async (id) => {
  return User.scope('withSecretColumns').findOne({ where: { id } });
};
const updateUserById = async (req) => {
  const parsedSett =JSON.parse(req.body.settings)
  const userId = req.user?.dataValues.id? req.user.dataValues.id:1;
  return User.update( { settings: parsedSett },
  { where: { id: userId } });
};

const getAllUser = async (page, limit, email) => {
  try {
    const offset = (page - 1) * limit;

    const whereClause = {
      role: 'user', 
      ...(email && { email: { [Sequelize.Op.like]: `%${email}%` } }) 
    };
    console.log(email ? `Filtering tasks with email: ${email}` : 'Fetching all tasks without email filter');

    const { count, rows: users } = await User.findAndCountAll({
      offset,
      limit,
      where: whereClause,
    });

    const usersWithParsedPermissions = users.map(user => {
      return {
        ...user.toJSON(), 
        permissions: user.permissions ? user.permissions.replace(/"/g, '').split(',') : [] 
      };
    });

    return { count, users: usersWithParsedPermissions };
  } catch (error) {
    console.error('Error in getAllUser service:', error);
    throw new Error('Error fetching users');
  }
};


  const getUserById = async (id) => {
    try {
      const user = await User.findOne({
        where: { id },
        include: [
          {
            model: UserBoard,
          },
        ],
      });
  
     
      if (!user) {
        return null;
      }
  
     
    const groupUsers = await GroupUser.findAll({
      where: {
        userId: {
          [Sequelize.Op.like]: `%${id}%`,  
        },
      },
    });

    const groupBoards = await GroupBoard.findAll({
      where: {
        groupUserId: {
          [Sequelize.Op.in]: groupUsers.map(groupUser => groupUser.id), 
        },
      },
    });
      
      const userWithModifiedBoards = {
        ...user.toJSON(), 
        UserBoards: user.UserBoards.map(board => {
          return {
            ...board.toJSON(), 
            boardListId: JSON.parse(board.boardListId), 
            permissions: JSON.parse(board.permissions),  
          };
        }),
        GroupBoards: groupBoards.map(groupBoard => ({
          ...groupBoard.toJSON(),
        })),
      };
      return userWithModifiedBoards; 
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Error fetching user by ID');
    }
  };
  
  const updateUser = async (id, UserData) => {
    try {
      const [updated] = await User.update(UserData, {
        where: { id },
        returning: true, 
      });
      if (updated === 0) {
        throw new Error('GmailUser not found');
      }
      const updatedUser = await User.findByPk(id);
      return updatedUser;
    } catch (error) {
      throw new Error('Error updating User: ' + error.message);
    }
  };
  const deleteUserById = async (id) => {
    try {
      const result = await User.update({ status: false }, {
        where: { id }
      });
  
      return result > 0;
    } catch (error) {
      console.error('Error in userService.deleteUserById:', error);
      throw error;
    }
  };
module.exports = {
  createUser,
  getUserByEmail,
  getUserWithSecretFields,
  getUserWithSecretFieldsById,
  updateUserById,
  getAllUser,
  getUserById,
  updateUser,
  deleteUserById
};