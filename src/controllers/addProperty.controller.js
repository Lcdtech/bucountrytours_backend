const addPropertyService = require('../services/addProperty.service');

const createAddProperty = async (req, res) => {
  try {
    const taskProperty = await addPropertyService.createAddProperty(req.body);
    res.status(201).json({
      message: 'taskProperty created successfully',
      data: taskProperty,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        message: 'Validation error',
        error: error.message,
        details: error.errors, 
      });
    } else {
      res.status(500).json({
        message: 'Error creating taskProperty',
        error: error.message,
      });
    }
  }
};


const updateAddProperty = async (req, res) => {
  const id = req.params.id;
  const AddPropertyData = req.body;
  try {
    const updatedAddProperty = await addPropertyService.updateAddProperty(id, AddPropertyData);
    res.status(200).json({
      message: 'taskProperty updated successfully',
      data: updatedAddProperty,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating taskProperty',
      error: error.message,
    });
  }
};


const getAddPropertyBy = async (req, res) => {
  const id = req.params.id;
  
  try {
    const taskProperty = await addPropertyService.getAddPropertyById(id);
    res.status(200).json({
      message: 'taskProperty found',
      data: taskProperty,
    });
  } catch (error) {
    res.status(404).json({
      message: 'taskProperty not found',
      error: error.message,
    });
  }
};

const getAllAddProperty = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const { AddPropertys, totalAddPropertys } = await addPropertyService.getAllAddProperty(page, limit);
    res.status(200).json({
      message: 'All AddPropertys fetched successfully',
      data: AddPropertys,
      totalAddPropertys,
      totalPages: Math.ceil(totalAddPropertys / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching AddPropertys',
      error: error.message,
    });
  }
};


const deleteAddProperty = async (req, res) => {
  const id = req.params.id;
  
  try {
    const deletedAddProperty = await addPropertyService.deleteAddPropertyById(id);
    res.status(200).json({
      message: 'taskProperty deleted successfully',
      data: deletedAddProperty,
    });
  } catch (error) {
    res.status(404).json({
      message: 'taskProperty not found',
      error: error.message,
    });
  }
};

module.exports = {
  createAddProperty,
  updateAddProperty,
  getAddPropertyBy,
  getAllAddProperty,
  deleteAddProperty,
};
