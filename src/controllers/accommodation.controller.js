const accommodationService = require('../services/accommodation.service.js');

const createAccommodation = async (req, res) => {
  try {
    const AccommodationData = req.body;  
    const newAccommodation = await accommodationService.createAccommodation(AccommodationData);  
    return res.status(201).json({
      message: 'Accommodation created successfully',
      data: newAccommodation
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating product',
      error: error.message
    });
  }
};
const updateAccommodation = async (req, res) => {
    try {
      const AccommodationId = req.params.id; 
      const accommodationData = req.body;    
      const updatedAccommodation = await accommodationService.updateAccommodation(AccommodationId, accommodationData);
  
      if (!updatedAccommodation) {
        return res.status(404).json({
          message: 'Accommodation not found',
        });
      }
  
      return res.status(200).json({
        message: 'Accommodation updated successfully',
        data: updatedAccommodation,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating Accommodation',
        error: error.message,
      });
    }
};
const getAccommodationById = async (req, res) => {
    try {
      const accommodationId = req.params.id;  
  
      const accommodation = await accommodationService.getAccommodationById(accommodationId);
  
      if (!accommodation) {
        return res.status(404).json({
          message: 'Accommodation not found',
        });
      }
  
      return res.status(200).json({
        message: 'Accommodation fetched successfully',
        data: accommodation,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching Accommodation',
        error: error.message,
      });
    }
  };

  const getAllAccommodations = async (req, res) => {
    try {
      const { page = 1, limit = 10, search = '' } = req.query; 
  
      const accommodations = await accommodationService.getAllAccommodations(page, limit, search);
  
      return res.status(200).json({
        message: 'Accommodations fetched successfully',
        data: accommodations,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching Accommodations',
        error: error.message,
      });
    }
  };
  
  const deleteAccommodation = async (req, res) => {
    try {
      const { id } = req.params; 
      const deletedAccommodation = await accommodationService.deleteAccommodation(id);
  
      if (!deletedAccommodation) {
        return res.status(404).json({
          message: 'Accommodation not found',
        });
      }
  
      return res.status(200).json({
        message: 'Accommodation deleted successfully',
        data: deletedAccommodation,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error deleting Accommodation',
        error: error.message,
      });
    }
  };
module.exports = {
  createAccommodation,
  updateAccommodation,
  getAccommodationById,
  getAllAccommodations,
  deleteAccommodation
};
