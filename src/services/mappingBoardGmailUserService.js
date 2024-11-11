const { MappingBoardGmailUser } = require('../models');

const createMappingBoardGmailUser = async (data) => {
  try {
    const newMapping = await MappingBoardGmailUser.create(data);
    return newMapping;
  } catch (error) {
    throw new Error(`Error creating mapping: ${error.message}`);
  }
};
const updateMappingBoardGmailUser = async (id, data) => {
    try {
      const mapping = await MappingBoardGmailUser.findByPk(id);
      if (!mapping) {
        throw new Error('Mapping not found');
      }
  
      await mapping.update(data);
      return mapping;
    } catch (error) {
      throw new Error(`Error updating mapping: ${error.message}`);
    }
  };

  const getMappingBoardGmailUserById = async (id) => {
    try {
      const mapping = await MappingBoardGmailUser.findByPk(id);
      if (!mapping) {
        throw new Error('Mapping not found');
      }
      return mapping;
    } catch (error) {
      throw new Error(`Error fetching mapping: ${error.message}`);
    }
  };

  const getAllMappingBoardGmailUsers = async () => {
    try {
      const mappings = await MappingBoardGmailUser.findAll();
      return mappings;
    } catch (error) {
      throw new Error(`Error fetching mappings: ${error.message}`);
    }
  };

  const deleteMappingBoardGmailUser = async (id) => {
    try {
      const mapping = await MappingBoardGmailUser.findByPk(id);
      if (!mapping) {
        throw new Error('Mapping not found');
      }
  
      await mapping.update({
        where: {id},
        where: {status: false }
      });
      return { message: 'Mapping deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting mapping: ${error.message}`);
    }
  };

module.exports = {
  createMappingBoardGmailUser,
  updateMappingBoardGmailUser,
  getMappingBoardGmailUserById,
  getAllMappingBoardGmailUsers,
  deleteMappingBoardGmailUser
};
