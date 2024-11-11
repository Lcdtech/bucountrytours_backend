const mappingBoardGmailUserService = require('../services/mappingBoardGmailUserService.js');

const createMappingBoardGmailUser = async (req, res) => {
  try {
    const data = req.body;
    const newMapping = await mappingBoardGmailUserService.createMappingBoardGmailUser(data);
    return res.status(201).json({
      success: true,
      message: 'Mapping created successfully',
      data: newMapping
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error creating mapping: ${error.message}`
    });
  }
};

const updateMappingBoardGmailUser = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
  
      const updatedMapping = await mappingBoardGmailUserService.updateMappingBoardGmailUser(id, data);
      return res.status(200).json({
        success: true,
        message: 'Mapping updated successfully',
        data: updatedMapping
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error updating mapping: ${error.message}`
      });
    }
  };

  const getMappingBoardGmailUserBy = async (req, res) => {
    try {
      const { id } = req.params;
      const mapping = await mappingBoardGmailUserService.getMappingBoardGmailUserById(id);
      return res.status(200).json({
        success: true,
        message: 'Mapping fetched successfully',
        data: mapping
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error fetching mapping: ${error.message}`
      });
    }
  };
  
  const getAllMappingBoardGmailUser = async (req, res) => {
    try {
      const mappings = await mappingBoardGmailUserService.getAllMappingBoardGmailUsers();
      return res.status(200).json({
        success: true,
        message: 'Mappings fetched successfully',
        data: mappings
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error fetching mappings: ${error.message}`
      });
    }
  };

  const deleteMappingBoardGmailUser = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await mappingBoardGmailUserService.deleteMappingBoardGmailUser(id);
      return res.status(200).json({
        success: true,
        message: response.message
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error deleting mapping: ${error.message}`
      });
    }
  }
module.exports = {
  createMappingBoardGmailUser,
  updateMappingBoardGmailUser,
  getMappingBoardGmailUserBy,
  getAllMappingBoardGmailUser,
  deleteMappingBoardGmailUser
};
