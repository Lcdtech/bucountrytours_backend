const ka_inclusionsGroupService = require('../services/ka_inclusionsGroup.service');

const createKa_inclusionsGroup = async (req, res) => {
    try {
      const ka_inclusionsGroup = await ka_inclusionsGroupService.createKa_inclusionsGroup(req.body);
      res.status(201).json({
        message: 'Ka_inclusionsGroup created successfully',
        data: ka_inclusionsGroup,
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
          message: 'Error creating Ka_inclusionsGroup',
          error: error.message,
        });
      }
    }
  };
  
  
  const updateKa_inclusionsGroup = async (req, res) => {
    const id = req.params.id;
    const ka_inclusionsGroupData = req.body;
    try {
      const updatedKa_inclusionsGroup = await ka_inclusionsGroupService.updateKa_inclusionsGroup(id, ka_inclusionsGroupData);
      res.status(200).json({
        message: 'Ka_inclusionsGroup updated successfully',
        data: updatedKa_inclusionsGroup,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating Ka_inclusionsGroup',
        error: error.message,
      });
    }
  };

  const getKa_inclusionsGroupBy = async (req, res) => {
    const id = req.params.id;
    try {
      const ka_inclusionsGroup = await ka_inclusionsGroupService.getKa_inclusionsGroupById(id);
      res.status(200).json({
        message: 'Ka_inclusionsGroup found',
        data: ka_inclusionsGroup,
      });
    } catch (error) {
      res.status(404).json({
        message: 'Ka_inclusionsGroup not found',
        error: error.message,
      });
    }
  };
  
  const getAllKa_inclusionsGroup = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
      const { Ka_inclusionsGroups, totalKa_inclusionsGroup } = await ka_inclusionsGroupService.getAllKa_inclusionsGroup(page, limit);
      res.status(200).json({
        message: 'All Ka_inclusionsGroup fetched successfully',
        data: Ka_inclusionsGroups,
        totalKa_inclusionsGroup,
        totalPages: Math.ceil(totalKa_inclusionsGroup / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching AddKa_inclusionsGroup',
        error: error.message,
      });
    }
  };
  
  
  const deleteKa_inclusionsGroup = async (req, res) => {
    const id = req.params.id;
    
    try {
      const deletedKa_inclusionsGroup = await ka_inclusionsGroupService.deleteKa_inclusionsGroupById(id);
      res.status(200).json({
        message: 'Ka_inclusionsGroupdeleted successfully',
        data: deletedKa_inclusionsGroup,
      });
    } catch (error) {
      res.status(404).json({
        message: 'Ka_inclusionsGroup not found',
        error: error.message,
      });
    }
  };
  
  module.exports = {
        createKa_inclusionsGroup,
        updateKa_inclusionsGroup,
        getKa_inclusionsGroupBy,
        getAllKa_inclusionsGroup,
        deleteKa_inclusionsGroup,  
};