
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_userValidation = require('../../validations/ka_user.validation');
const ka_userController = require('../../controllers/ka_user.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(ka_userValidation.createKa_bu4Schema), ka_userController.createKa_theme);
router.put('/:id',auth('User','admin'), validate(ka_userValidation.updateKa_bu4), ka_userController.updateKa_theme);
router.get('/:id',auth('User','admin'), ka_userController.getKa_themeBy);
router.get('',auth('User','admin'), ka_userController.getAllKa_theme);
router.delete('/:id',auth('User','admin'), ka_userController.deletedKa_theme);

module.exports = router;