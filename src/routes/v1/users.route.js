const express = require('express');
const router = express.Router();
const userController = require('../../controllers/usergroup.controller');

// CRUD routes
router.post('/', userController.createUser);

// Route to get a role by ID
router.get('/:id', userController.getUserById);

// Route to update a role
router.put('/:id', userController.updateUser);

// Route to get all roles (with pagination)
router.get('/', userController.getAllUsers);

// Route to soft delete a role
router.delete('/:id', userController.deleteUser);

module.exports = router;
