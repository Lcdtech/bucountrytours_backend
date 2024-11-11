const permissionService = require('../services/permission.service');


const createPermission = async (req, res) => {
    try {
        const permissionData = req.body;  

        const newPermission = await permissionService.createPermission(permissionData);

        res.status(201).json({ success: true, data: newPermission });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updatePermission = async (req, res) => {
    try {
        const { id } = req.params;  
        const permissionData = req.body; 

        const updatedPermission = await permissionService.updatePermission(id, permissionData);

        if (!updatedPermission) {
            return res.status(404).json({ success: false, message: 'Permission not found' });
        }

        res.status(200).json({ success: true, data: updatedPermission });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getPermissionBy = async (req, res) => {
    try {
        const { id } = req.params;  

        const permission = await permissionService.getPermissionById(id);

        if (!permission) {
            return res.status(404).json({ success: false, message: 'Permission not found' });
        }

        res.status(200).json({ success: true, data: permission });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const getAllPermission = async (req, res) => {
    try {
      const permissions = await permissionService.getAllPermissions();
      return res.status(200).json({
        success: true,
        data: permissions,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch permissions',
        error: error.message,
      });
    }
  };

const deletePermission = async (req, res) => {
    try {
        const { id } = req.params;  
        
        const result = await permissionService.deletePermissionById(id);

        if (result === 0) {
            return res.status(404).json({ success: false, message: 'Permission not found' });
        }

        res.status(200).json({ success: true, message: 'Permission deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createPermission,
    updatePermission,
    getPermissionBy,
    getAllPermission,
    deletePermission
};