const { Role } = require('../models'); // No need to import Privilege

const createRole = async (roleData) => {
  try {
    const result = await Role.create(roleData); // Use the new role structure
    return result;
  } catch (error) {
    console.error("Error creating role:", error);
    throw error;
  }
};

const updateRole = async (id, updateData) => {
  const { name, description, privileges } = updateData; // Removed privileges from destructuring

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      throw new Error('Role not found');
    }

    // Update role details
    await role.update({ name, description, privileges }); // Only update name and description

    // No need to handle privileges as per your requirement
    return role;
  } catch (error) {
    console.error('Error updating role:', error);
    throw error;
  }
};

const getRoleById = async (id) => {
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      throw new Error('Role not found');
    }
    return role; // Return role without associated privileges
  } catch (error) {
    console.error('Error fetching role:', error);
    throw error;
  }
};

const getAllRoles = async (page, limit, search) => {
  try {
    const offset = (page - 1) * limit;
    const whereCondition = search ? {
      name: { [Op.like]: `%${search}%` }
    } : {};

    const roles = await Role.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      // Removed include for privileges
    });

    return roles.rows;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

const deleteRole = async (id) => {
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      throw new Error('Role not found');
    }
    await role.destroy(); // Delete the role (use soft delete if needed)
    return role;
  } catch (error) {
    console.error('Error deleting role:', error);
    throw error;
  }
};

module.exports = {
  createRole,
  updateRole,
  getRoleById,
  getAllRoles,
  deleteRole
};
