const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/role.controller');

// CRUD routes
router.post('/', roleController.createRole);

// Route to get a role by ID
router.get('/:id', roleController.getRoleById);

// Route to update a role
router.put('/:id', roleController.updateRole);

// Route to get all roles (with pagination)
router.get('/', roleController.getAllRoles);

// Route to soft delete a role
router.delete('/:id', roleController.deleteRole);

module.exports = router;
