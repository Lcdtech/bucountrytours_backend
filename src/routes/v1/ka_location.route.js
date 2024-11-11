
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_locationValidation = require('../../validations/ka_location.validation');
const ka_locationController = require('../../controllers/ka_location.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(ka_locationValidation.createKa_bu4Schema), ka_locationController.createKa_theme);
router.put('/:id',auth('User','admin'), validate(ka_locationValidation.updateKa_bu4), ka_locationController.updateKa_theme);
router.get('/:id',auth('User','admin'), ka_locationController.getKa_themeBy);
router.get('',auth('User','admin'), ka_locationController.getAllKa_theme);
router.delete('/:id',auth('User','admin'), ka_locationController.deletedKa_theme);

module.exports = router;