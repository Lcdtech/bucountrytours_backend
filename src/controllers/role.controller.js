const roleService = require('../services/role.service.js');

// Create a new role with privileges
const createRole = async (req, res) => {
  try {
    const role = await roleService.createRole(req.body); // Accept the entire role object from the request body
    res.status(201).json(role); // Return the created role
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update an existing role with privileges
const updateRole = async (req, res) => {
  try {
    const role = await roleService.updateRole(req.params.id, req.body);
    res.json(role);
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get role by ID with privileges
const getRoleById = async (req, res) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all roles with privileges
const getAllRoles = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const roles = await roleService.getAllRoles(page, limit, search);
    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete role
const deleteRole = async (req, res) => {
  try {
    const role = await roleService.deleteRole(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRole,
  updateRole,
  getRoleById,
  getAllRoles,
  deleteRole
};
