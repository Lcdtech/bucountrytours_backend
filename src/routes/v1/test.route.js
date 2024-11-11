

const express = require('express');
const validate = require('../../middlewares/validate');
const testValidation = require('../../validations/ka_bu1.validation');
const testController = require('../../controllers/test.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(testValidation.createKa_bu1Schema), testController.createKa_theme);
router.put('/:id',auth('User','admin'), validate(testValidation.updateKa_bu1), testController.updateKa_theme);
router.get('/:id',auth('User','admin'), testController.getKa_themeBy);
router.get('',auth('User','admin'), testController.getAllKa_theme);
router.delete('/:id',auth('User','admin'), testController.deletedKa_theme);

module.exports = router;