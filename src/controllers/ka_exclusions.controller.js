const ka_exclusionsService = require('../services/ka_exclusions.service');

const createKa_exclusions = async (req, res) => {
  try {
    const userbody = req.body;
    const ka_exclusions = await ka_exclusionsService.createKa_exclusions(userbody);
    res.status(201).json({
      message: 'Ka_exclusions created successfully',
      data: ka_exclusions,
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
        message: 'Error creating Ka_exclusions',
        error: error.message,
      });
    }
  }
};


const updateKa_exclusions = async (req, res) => {
  const id = req.params.id;
  const ka_exclusionsData = req.body;
  try {
    const updatedKa_exclusions = await ka_exclusionsService.updateKa_exclusions(id, ka_exclusionsData);
    res.status(200).json({
      message: 'ka_exclusions updated successfully',
      data: updatedKa_exclusions,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating Ka_exclusions',
      error: error.message,
    });
  }
};


const getKa_exclusionsBy = async (req, res) => {
  const id = req.params.id;
  
  try {
    const Ka_exclusions = await ka_exclusionsService.getKa_exclusionsById(id);
    res.status(200).json({
      message: 'Ka_exclusions found',
      data: Ka_exclusions,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Ka_exclusions not found',
      error: error.message,
    });
  }
};
const getAllKa_exclusions = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const result = await ka_exclusionsService.getAllKa_exclusions(page, limit);

    const { Ka_exclusions, total } = result;  

    res.status(200).json({
      message: 'All Ka_exclusions fetched successfully',
      data: Ka_exclusions,
      totalKa_exclusions: total,  
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching Ka_exclusions',
      error: error.message,
    });
  }
};


const deletedKa_exclusions = async (req, res) => {
  const id = req.params.id;
  
  try {
    const del = await ka_exclusionsService.deleteKa_exclusionsById(id);
    res.status(200).json({
      message: 'ka_exclusions deleted successfully',
      data: del,
    });
  } catch (error) {
    res.status(404).json({
      message: 'ka_exclusions not found',
      error: error.message,
    });
  }
};

module.exports = {
 createKa_exclusions,
 updateKa_exclusions,
 getKa_exclusionsBy,
 getAllKa_exclusions,
 deletedKa_exclusions
};
