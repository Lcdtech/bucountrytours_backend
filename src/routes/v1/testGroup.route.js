

const express = require('express');
const validate = require('../../middlewares/validate');
const testGroupValidation = require('../../validations/ka_bu1.validation');
const testGroupController = require('../../controllers/testGroup.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(testGroupValidation.createKa_bu1Schema), testGroupController.createKa_theme);
router.put('/:id',auth('User','admin'), validate(testGroupValidation.updateKa_bu1), testGroupController.updateKa_theme);
router.get('/:id', auth('User','admin'),testGroupController.getKa_themeBy);
router.get('',auth('User','admin'), testGroupController.getAllKa_theme);
router.delete('/:id',auth('User','admin'), testGroupController.deletedKa_theme);

module.exports = router;