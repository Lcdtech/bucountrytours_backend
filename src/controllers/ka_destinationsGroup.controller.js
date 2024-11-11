const ka_destinationsGroupService = require('../services/ka_destinationsGroup.service');

const createKa_destinationsGroup = async (req, res) => {
 try {
      const kA_destinationsGroup = await ka_destinationsGroupService.createKa_destinationsGroup(req.body);
      res.status(201).json({
        message: 'Ka_destinationsGroup created successfully',
        data: kA_destinationsGroup,
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
          message: 'Error creating Ka_destinationsGroup',
          error: error.message,
        });
      }
    }
  };
  
  
  const updateKa_destinationsGroup = async (req, res) => {
    const id = req.params.id;
    const ka_destinationsGroupData = req.body;
    try {
      const updatedKa_destinationsGroup = await ka_destinationsGroupService.updateKa_destinationsGroup(id, ka_destinationsGroupData);
      res.status(200).json({
        message: 'Ka_destinationsGroup updated successfully',
        data: updatedKa_destinationsGroup,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating Ka_destinationsGroup',
        error: error.message,
      });
    }
  };

  const getAllKa_destinationsGroup = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
      const { KA_destinationsGroup, total } = await ka_destinationsGroupService.getAllKa_destinationsGroup(page, limit);
      res.status(200).json({
        message: 'All Ka_destinationsGroup fetched successfully',
        data: KA_destinationsGroup,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching Ka_destinationsGroup',
        error: error.message,
      });
    }
  };

  const getKa_destinationsGroupBy = async (req, res) => {
    const id = req.params.id;
    try {
      const ka_destinationsGroup = await ka_destinationsGroupService.getKa_destinationsGroupById(id);
      res.status(200).json({
        message: 'Ka_destinationsGroup found',
        data: ka_destinationsGroup,
      });
    } catch (error) {
      res.status(404).json({
        message: 'Ka_destinationsGroup not found',
        error: error.message,
      });
    }
  };
  
  
  const deleteKa_destinationsGroup = async (req, res) => {
    const id = req.params.id;
    
    try {
      const del = await ka_destinationsGroupService.deleteKa_destinationsGroupById(id);
      res.status(200).json({
        message: 'Ka_destinationsGroupdeleted successfully',
        data: del,
      });
    } catch (error) {
      res.status(404).json({
        message: 'Ka_destinationsGroup not found',
        error: error.message,
      });
    }
  };
  
  module.exports = {
        createKa_destinationsGroup,
        updateKa_destinationsGroup,
        getKa_destinationsGroupBy,
        getAllKa_destinationsGroup,
        deleteKa_destinationsGroup  
};