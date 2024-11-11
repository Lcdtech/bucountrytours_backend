
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_whatToBringValidation = require('../../validations/ka_bu1.validation');
const ka_whatToBringController = require('../../controllers/ka_whatToBring.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(ka_whatToBringValidation.createKa_bu1Schema), ka_whatToBringController.createKa_theme);
router.put('/:id',auth('User','admin'), validate(ka_whatToBringValidation.updateKa_bu1), ka_whatToBringController.updateKa_theme);
router.get('/:id',auth('User','admin'), ka_whatToBringController.getKa_themeBy);
router.get('',auth('User','admin'), ka_whatToBringController.getAllKa_theme);
router.delete('/:id',auth('User','admin'), ka_whatToBringController.deletedKa_theme);

module.exports = router;