
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_tripValidation = require('../../validations/ka_trip.validation');
const ka_tripController = require('../../controllers/ka_trip.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(ka_tripValidation.createKa_bu1Schema), ka_tripController.createKa_theme);
router.put('/:id',auth('User','admin'), validate(ka_tripValidation.updateKa_bu1), ka_tripController.updateKa_theme);
router.get('/:id', ka_tripController.getKa_themeBy);
router.get('',auth('User','admin'), ka_tripController.getAllKa_theme);
router.delete('/:id',auth('User','admin'), ka_tripController.deletedKa_theme);

module.exports = router;