const express = require('express');
const validate = require('../../middlewares/validate');
const permissionValidation = require('../../validations/permission.validation');
const permissionController = require('../../controllers/permission.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/createPermission',auth('User','admin'), validate(permissionValidation.createPermissionSchema), permissionController.createPermission);
router.put('/updatePermission/:id',auth('User','admin'), validate(permissionValidation.updatePermission), permissionController.updatePermission);
router.get('/getPermissionBy/:id',auth('User','admin'), permissionController.getPermissionBy);
router.get('/getAllPermission',auth('User','admin'), permissionController.getAllPermission);
router.delete('/deletePermission/:id',auth('User','admin'), permissionController.deletePermission);

module.exports = router;
