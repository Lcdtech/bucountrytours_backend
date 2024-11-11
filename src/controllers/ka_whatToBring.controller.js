const ka_whatToBringService = require('../services/ka_whatToBring.service');

const createKa_theme = async (req, res) => {
  try {
    const ka_theme = await ka_whatToBringService.createKa_theme(req.body);
    res.status(201).json({
      message: 'ka_whatToBringService created successfully',
      data: ka_theme,
    });
  } catch (error) {
    if (error.title === 'ValidationError') {
      res.status(400).json({
        message: 'Validation error',
        error: error.message,
        details: error.errors, 
      });
    } else {
      res.status(500).json({
        message: 'Error creating ka_whatToBringService',
        error: error.message,
      });
    }
  }
};


const updateKa_theme = async (req, res) => {
  const id = req.params.id;
  const ka_themeData = req.body;
  try {
    const updatedKa_theme = await ka_whatToBringService.updateKa_theme(id, ka_themeData);
    res.status(200).json({
      message: 'ka_whatToBringService updated successfully',
      data: updatedKa_theme,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating ka_whatToBringService',
      error: error.message,
    });
  }
};


const getKa_themeBy = async (req, res) => {
  const id = req.params.id;
  
  try {
    const KA_theme = await ka_whatToBringService.getKa_themeById(id);
    res.status(200).json({
      message: 'ka_whatToBringService found',
      data: KA_theme,
    });
  } catch (error) {
    res.status(404).json({
      message: 'ka_whatToBringService not found',
      error: error.message,
    });
  }
};

const getAllKa_theme = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const { KA_theme, totalKa_theme } = await ka_whatToBringService.getAllKa_theme(page, limit);
    res.status(200).json({
      message: 'All ka_whatToBringService fetched successfully',
      data: KA_theme,
      totalKa_theme,
      totalPages: Math.ceil(totalKa_theme / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching ka_whatToBringService',
      error: error.message,
    });
  }
};

const deletedKa_theme = async (req, res) => {
  const id = req.params.id;
  
  try {
    const deletedKa_theme = await ka_whatToBringService.deleteKa_themeById(id);
    res.status(200).json({
      message: 'ka_whatToBringService deleted successfully',
      data: deletedKa_theme,
    });
  } catch (error) {
    res.status(404).json({
      message: 'ka_whatToBringService not found',
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
