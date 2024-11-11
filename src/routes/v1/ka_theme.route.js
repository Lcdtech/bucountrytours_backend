
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_themeValidation = require('../../validations/ka_bu1.validation');
const ka_themeController = require('../../controllers/ka_theme.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(ka_themeValidation.createKa_bu1Schema), ka_themeController.createKa_theme);
router.put('/:id',auth('User','admin'), validate(ka_themeValidation.updateKa_bu1), ka_themeController.updateKa_theme);
router.get('/:id',auth('User','admin'), ka_themeController.getKa_themeBy);
router.get('',auth('User','admin'), ka_themeController.getAllKa_theme);
router.delete('/:id',auth('User','admin'), ka_themeController.deletedKa_theme);

module.exports = router;