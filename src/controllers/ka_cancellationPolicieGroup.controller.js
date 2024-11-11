const ka_cancellationPolicieGroupService = require('../services/ka_cancellationPolicieGroup.service');

const createKa_themeGroup = async (req, res) => {
    try {
      console.log("Request Body:", req.body);
      const ka_themeGroup = await ka_cancellationPolicieGroupService.createKa_themeGroup(req.body);
      res.status(201).json({
        message: 'ka_cancellationPolicieGroupService created successfully',
        data: ka_themeGroup,
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
          message: 'Error creating ka_cancellationPolicieGroupService',
          error: error.message,
        });
      }
    }
  };
  
  
  const updateKa_themeGroup = async (req, res) => {
    const id = req.params.id;
    const ka_themeGroupData = req.body;
    console.log("id",id)
    try {
      const updatedKa_themeGroup = await ka_cancellationPolicieGroupService.updateKa_themeGroup(id, ka_themeGroupData);
      res.status(200).json({
        message: 'ka_cancellationPolicieGroupService updated successfully',
        data: updatedKa_themeGroup,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating ka_cancellationPolicieGroupService',
        error: error.message,
      });
    }
  };

  const getAllKa_themeGroup = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
      const { Ka_themeGroup, total } = await ka_cancellationPolicieGroupService.getAllKa_themeGroup(page, limit);
      console.log("dassdf",Ka_themeGroup)
      res.status(200).json({
        message: 'All ka_cancellationPolicieGroupService fetched successfully',
        data: Ka_themeGroup,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching ka_cancellationPolicieGroupService',
        error: error.message,
      });
    }
  };

  const getKa_themeGroupBy = async (req, res) => {
    const id = req.params.id;
    try {
      const ka_themeGroup = await ka_cancellationPolicieGroupService.getKa_themeGroupById(id);
      res.status(200).json({
        message: 'ka_cancellationPolicieGroupService found',
        data: ka_themeGroup,
      });
    } catch (error) {
      res.status(404).json({
        message: 'ka_cancellationPolicieGroupService not found',
        error: error.message,
      });
    }
  };
  
  
  const deleteKa_themesGroup = async (req, res) => {
    const id = req.params.id;
    
    try {
      const del = await ka_cancellationPolicieGroupService.deleteKa_themeGroupById(id);
      res.status(200).json({
        message: 'ka_cancellationPolicieGroupService eleted successfully',
        data: del,
      });
    } catch (error) {
      res.status(404).json({
        message: 'ka_cancellationPolicieGroupService not found',
        error: error.message,
      });
    }
  };
  
  module.exports = {
        createKa_themeGroup,
        updateKa_themeGroup,
        getKa_themeGroupBy,
        getAllKa_themeGroup,
        deleteKa_themesGroup  
};