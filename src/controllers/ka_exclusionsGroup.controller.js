const ka_exclusionsGroupService = require('../services/ka_exclusionsGroup.service');

const createKa_exclusionsGroup = async (req, res) => {
    try {
      const ka_exclusionsGroup = await ka_exclusionsGroupService.createKa_exclusionsGroup(req.body);
      res.status(201).json({
        message: 'Ka_exclusionsGroup created successfully',
        data: ka_exclusionsGroup,
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
          message: 'Error creating Ka_exclusionsGroup',
          error: error.message,
        });
      }
    }
  };
  
  
  const updateKa_exclusionsGroup = async (req, res) => {
    const id = req.params.id;
    const ka_exclusionsGroupData = req.body;
    try {
      const updatedKa_exclusionsGroup = await ka_exclusionsGroupService.updateKa_exclusionsGroup(id, ka_exclusionsGroupData);
      res.status(200).json({
        message: 'Ka_exclusionsGroup updated successfully',
        data: updatedKa_exclusionsGroup,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating Ka_exclusionsGroup',
        error: error.message,
      });
    }
  };

  const getKa_exclusionsGroupBy = async (req, res) => {
    const id = req.params.id;
    try {
      const ka_exclusionsGroup = await ka_exclusionsGroupService.getKa_exclusionsGroupById(id);
      res.status(200).json({
        message: 'Ka_exclusionsGroup found',
        data: ka_exclusionsGroup,
      });
    } catch (error) {
      res.status(404).json({
        message: 'Ka_exclusionsGroup not found',
        error: error.message,
      });
    }
  };
  
  const getAllKa_exclusionsGroup = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
      const { Ka_exclusionsGroups, totalKa_exclusionsGroup } = await ka_exclusionsGroupService.getAllKa_exclusionsGroup(page, limit);
      res.status(200).json({
        message: 'All Ka_exclusionsGroup fetched successfully',
        data: Ka_exclusionsGroups,
        totalKa_exclusionsGroup,
        totalPages: Math.ceil(totalKa_exclusionsGroup / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching AddKa_exclusionsGroup',
        error: error.message,
      });
    }
  };
  
  
  const deleteKa_exclusionsGroup = async (req, res) => {
    const id = req.params.id;
    
    try {
      const deletedKa_exclusionsGroup = await ka_exclusionsGroupService.deleteKa_exclusionsGroupById(id);
      res.status(200).json({
        message: 'Ka_exclusionsGroupdeleted successfully',
        data: deletedKa_exclusionsGroup,
      });
    } catch (error) {
      res.status(404).json({
        message: 'Ka_exclusionsGroup not found',
        error: error.message,
      });
    }
  };
  
  module.exports = {
        createKa_exclusionsGroup,
        updateKa_exclusionsGroup,
        getKa_exclusionsGroupBy,
        getAllKa_exclusionsGroup,
        deleteKa_exclusionsGroup,  
};