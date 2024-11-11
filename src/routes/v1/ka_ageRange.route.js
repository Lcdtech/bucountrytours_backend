
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_ageRangeValidation = require('../../validations/ageRange.validation');
const ka_ageRangeController = require('../../controllers/ka_ageRange.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(ka_ageRangeValidation.createKa_bu3Schema), ka_ageRangeController.createKa_theme);
router.put('/:id',auth('User','admin'), validate(ka_ageRangeValidation.updateKa_bu3), ka_ageRangeController.updateKa_theme);
router.get('/:id',auth('User','admin'), ka_ageRangeController.getKa_themeBy);
router.get('',auth('User','admin'), ka_ageRangeController.getAllKa_theme);
router.delete('/:id',auth('User','admin'), ka_ageRangeController.deletedKa_theme);

module.exports = router;