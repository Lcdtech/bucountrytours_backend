const { Permission } = require('../models');


const createPermission = async (permissionData) => {
   
    const newPermission = await Permission.create(permissionData);

    return newPermission;
};

const updatePermission = async (id, permissionData) => {
    const permission = await Permission.findByPk(id);

    if (!permission) {
        return null;  
    }

    await permission.update(permissionData);

    return permission; 
};

const getPermissionById = async (id) => {
    
    const permission = await Permission.findByPk(id);
    
    return permission;  
};


const getAllPermissions = async () => {
    try {
      const permissions = await Permission.findAll({
        where: {
          status: true
        }
      });
      return permissions;
    } catch (error) {
      throw new Error('Error fetching permissions');
    }
  };
  

const deletePermissionById = async (id) => {
  
    const result = await Permission.update({ status: false }, {
        where: { id }
      });

    return result;  
};

module.exports = {
    createPermission,
    updatePermission,
    getPermissionById,
    getAllPermissions,
    deletePermissionById
};