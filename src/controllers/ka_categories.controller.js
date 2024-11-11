const ka_categoriesService = require('../services/ka_categories.service');

const createKa_categories = async (req, res) => {
  try {
    const ka_categories = await ka_categoriesService.createKa_categories(req.body);
    res.status(201).json({
      message: 'categories created successfully',
      data: ka_categories,
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
        message: 'Error creating ka_categories',
        error: error.message,
      });
    }
  }
};


const updateKa_categories = async (req, res) => {
  const id = req.params.id;
  const ka_categoriesData = req.body;
  try {
    const updatedKa_categories = await ka_categoriesService.updateKa_categories(id, ka_categoriesData);
    res.status(200).json({
      message: 'ka_categories updated successfully',
      data: updatedKa_categories,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating Ka_categories',
      error: error.message,
    });
  }
};


const getKa_categoriesBy = async (req, res) => {
  const id = req.params.id;
  
  try {
    const Ka_categories = await ka_categoriesService.getKa_categoriesById(id);
    res.status(200).json({
      message: 'Ka_categories found',
      data: Ka_categories,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Ka_categories not found',
      error: error.message,
    });
  }
};

const getAllKa_categories = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const { Ka_categories, total } = await ka_categoriesService.getAllKa_categories(page, limit);
    res.status(200).json({
      message: 'All Ka_categories fetched successfully',
      data: Ka_categories, total,
      totalPages: Math.ceil(Ka_categories / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching ka_categories',
      error: error.message,
    });
  }
};


const deletedKa_categories = async (req, res) => {
  const id = req.params.id;
  
  try {
    const deletedKa_categories = await ka_categoriesService.deleteKa_categoriesById(id);
    res.status(200).json({
      message: 'ka_categories deleted successfully',
      data: deletedKa_categories,
    });
  } catch (error) {
    res.status(404).json({
      message: 'ka_categories not found',
      error: error.message,
    });
  }
};

module.exports = {
 createKa_categories,
 updateKa_categories,
 getAllKa_categories,
 getKa_categoriesBy,
 deletedKa_categories
};
