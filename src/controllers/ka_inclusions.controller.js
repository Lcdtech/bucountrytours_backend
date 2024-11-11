const ka_inclusionsService = require('../services/ka_inclusions.service');

const createKa_inclusions = async (req, res) => {
    try {
      const ka_inclusions = await ka_inclusionsService.createKa_inclusions(req.body);
      res.status(201).json({
        message: 'Ka_inclusions created successfully',
        data: ka_inclusions,
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
          message: 'Error creating Ka_inclusions',
          error: error.message,
        });
      }
    }
  };
  
  
  const updateKa_inclusions = async (req, res) => {
    const id = req.params.id;
    const ka_inclusionsData = req.body;
    try {
      const updatedKa_inclusions = await ka_inclusionsService.updateKa_inclusions(id, ka_inclusionsData);
      res.status(200).json({
        message: 'Ka_inclusions updated successfully',
        data: updatedKa_inclusions,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating Ka_inclusions',
        error: error.message,
      });
    }
  };


  const getKa_inclusionsBy = async (req, res) => {
    const id = req.params.id;
    
    try {
      const ka_inclusions = await ka_inclusionsService.getKa_inclusionsById(id);
      res.status(200).json({
        message: 'Ka_inclusions found',
        data: ka_inclusions,
      });
    } catch (error) {
      res.status(404).json({
        message: 'Ka_inclusions not found',
        error: error.message,
      });
    }
  };
  
  const getAllKa_inclusions = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
      const { ka_inclusions, totalKa_inclusions } = await ka_inclusionsService.getAllKa_inclusions(page, limit);
      res.status(200).json({
        message: 'All AddKa_inclusions fetched successfully',
        data: ka_inclusions,
        totalKa_inclusions,
        totalPages: Math.ceil(totalKa_inclusions / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching AddKa_inclusions',
        error: error.message,
      });
    }
  };
  
  
  const deleteKa_inclusions = async (req, res) => {
    const id = req.params.id;
    
    try {
      const deletedKa_inclusions = await ka_inclusionsService.deleteKa_inclusionsById(id);
      res.status(200).json({
        message: 'Ka_inclusionsdeleted successfully',
        data: deletedKa_inclusions,
      });
    } catch (error) {
      res.status(404).json({
        message: 'Ka_inclusions not found',
        error: error.message,
      });
    }
  };
  
  module.exports = {
        createKa_inclusions,
        updateKa_inclusions,
        getKa_inclusionsBy,
        getAllKa_inclusions,
        deleteKa_inclusions,  
};
  