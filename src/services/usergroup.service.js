const { UserGroup } = require('../models'); // No need to import Privilege
const bcrypt = require('bcryptjs');

const createUser = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 8);

    // Replace the plain text password with the hashed password
    const userDataWithHashedPassword = {
      ...userData,
      password: hashedPassword,
    };
    const result = await UserGroup.create(userDataWithHashedPassword); // Use the new role structure
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const updateUser = async (id, updateData) => {
  const { name, email, password,images,group } = updateData; // Removed privileges from destructuring

  try {
    const user = await UserGroup.findByPk(id);
    if (!user) {
      throw new Error('UserGroup not found');
    }

    // Update role details
    await user.update({ name, email, password,images,group }); // Only update name and description

    // No need to handle privileges as per your requirement
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await UserGroup.findByPk(id);
    if (!user) {
      throw new Error('UserGroup not found');
    }
    return user; // Return role without associated privileges
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

const getAllUsers = async (page, limit, search) => {
  try {
    const offset = (page - 1) * limit;
    const whereCondition = search ? {
      name: { [Op.like]: `%${search}%` }
    } : {};

    const users = await UserGroup.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      // Removed include for privileges
    });

    return users.rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await UserGroup.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy(); // Delete the role (use soft delete if needed)
    return user;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
    return UserGroup.findOne({
      where: { email }
    });
  };

const getUserWithSecretFields = async (email) => {
    return UserGroup.findOne({
        where: { email }
      });
  };

module.exports = {
  createUser,
  updateUser,
  getUserById,
  getAllUsers,
  deleteUser,
  getUserByEmail,
  getUserWithSecretFields
};
