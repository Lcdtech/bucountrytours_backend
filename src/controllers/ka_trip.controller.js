const ka_tripService = require('../services/ka_trip.service');

const createKa_theme = async (req, res) => {
  try {
    const ka_theme = await ka_tripService.createKa_theme(req.body);
    res.status(201).json({
      message: 'ka_tripService created successfully',
      data: ka_theme,
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
        message: 'Error creating ka_tripService',
        error: error.message,
      });
    }
  }
};


const updateKa_theme = async (req, res) => {
  const id = req.params.id;
  const ka_themeData = req.body;
  try {
    const updatedKa_theme = await ka_tripService.updateKa_theme(id, ka_themeData);
    res.status(200).json({
      message: 'ka_tripService updated successfully',
      data: updatedKa_theme,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating ka_tripService',
      error: error.message,
    });
  }
};


const getKa_themeBy = async (req, res) => {
  const id = req.params.id;
  
  try {
    const KA_theme = await ka_tripService.getKa_themeById(id);
    res.status(200).json({
      message: 'ka_tripService found',
      data: KA_theme,
    });
  } catch (error) {
    res.status(404).json({
      message: 'ka_tripService not found',
      error: error.message,
    });
  }
};

const getAllKa_theme = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  
  try {
    const { KA_theme, total, totalPages, currentPage } = await ka_tripService.getAllKa_theme(parseInt(page, 10), parseInt(limit, 10));

    res.status(200).json({
      message: 'All ka_tripService fetched successfully',
      data: KA_theme,
      total,  // Send total number of records
      totalPages,  // Include totalPages in the response
      currentPage,  // Send the current page
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching ka_tripService',
      error: error.message,
    });
  }
};

const deletedKa_theme = async (req, res) => {
  const id = req.params.id;
  
  try {
    const deletedKa_theme = await ka_tripService.deleteKa_themeById(id);
    res.status(200).json({
      message: 'ka_tripService deleted successfully',
      data: deletedKa_theme,
    });
  } catch (error) {
    res.status(404).json({
      message: 'ka_tripService not found',
      error: error.message,
    });
  }
};

module.exports = {
 createKa_theme,
 updateKa_theme,
 getKa_themeBy,
 getAllKa_theme,
 deletedKa_theme
};
