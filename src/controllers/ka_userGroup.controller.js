const ka_userGroupService = require('../services/ka_userGroup.service');

const createKa_themeGroup = async (req, res) => {
    try {
      const ka_themeGroup = await ka_userGroupService.createKa_themeGroup(req.body);
      res.status(201).json({
        message: 'ka_userGroupService created successfully',
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
          message: 'Error creating ka_userGroupService',
          error: error.message,
        });
      }
    }
  };
  
  
  const updateKa_themeGroup = async (req, res) => {
    const id = req.params.id;
    const ka_themeGroupData = req.body;
    try {
      const updatedKa_themeGroup = await ka_userGroupService.updateKa_themeGroup(id, ka_themeGroupData);
      res.status(200).json({
        message: 'ka_userGroupService updated successfully',
        data: updatedKa_themeGroup,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating ka_userGroupService',
        error: error.message,
      });
    }
  };

  const getAllKa_themeGroup = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
      const { Ka_themeGroup, total } = await ka_userGroupService.getAllKa_themeGroup(page, limit);
      res.status(200).json({
        message: 'All ka_userGroupService fetched successfully',
        data: Ka_themeGroup,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching ka_userGroupService',
        error: error.message,
      });
    }
  };

  const getKa_themeGroupBy = async (req, res) => {
    const id = req.params.id;
    try {
      const ka_themeGroup = await ka_userGroupService.getKa_themeGroupById(id);
      res.status(200).json({
        message: 'ka_userGroupService found',
        data: ka_themeGroup,
      });
    } catch (error) {
      res.status(404).json({
        message: 'ka_userGroupService not found',
        error: error.message,
      });
    }
  };
  
  
  const deleteKa_themesGroup = async (req, res) => {
    const id = req.params.id;
    
    try {
      const del = await ka_userGroupService.deleteKa_themeGroupById(id);
      res.status(200).json({
        message: 'ka_userGroupService successfully',
        data: del,
      });
    } catch (error) {
      res.status(404).json({
        message: 'ka_userGroupService not found',
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