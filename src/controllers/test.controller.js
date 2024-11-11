const testService = require('../services/test.service');

const createKa_theme = async (req, res) => {
  try {
    const ka_theme = await testService.createKa_theme(req.body);
    res.status(201).json({
      message: 'testService created successfully',
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
        message: 'Error creating testService',
        error: error.message,
      });
    }
  }
};


const updateKa_theme = async (req, res) => {
  const id = req.params.id;
  const ka_themeData = req.body;
  try {
    const updatedKa_theme = await testService.updateKa_theme(id, ka_themeData);
    res.status(200).json({
      message: 'testService updated successfully',
      data: updatedKa_theme,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating testService',
      error: error.message,
    });
  }
};


const getKa_themeBy = async (req, res) => {
  const id = req.params.id;
  
  try {
    const KA_theme = await testService.getKa_themeById(id);
    res.status(200).json({
      message: 'testService found',
      data: KA_theme,
    });
  } catch (error) {
    res.status(404).json({
      message: 'testService not found',
      error: error.message,
    });
  }
};

const getAllKa_theme = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const { KA_theme, totalKa_theme } = await testService.getAllKa_theme(page, limit);
    res.status(200).json({
      message: 'All testService fetched successfully',
      data: KA_theme,
      totalKa_theme,
      totalPages: Math.ceil(totalKa_theme / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching testService',
      error: error.message,
    });
  }
};

const deletedKa_theme = async (req, res) => {
  const id = req.params.id;
  
  try {
    const deletedKa_theme = await testService.deleteKa_themeById(id);
    res.status(200).json({
      message: 'testService deleted successfully',
      data: deletedKa_theme,
    });
  } catch (error) {
    res.status(404).json({
      message: 'testService not found',
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
