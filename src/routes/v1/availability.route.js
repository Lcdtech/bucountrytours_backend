const express = require('express');
const validate = require('../../middlewares/validate');
const availabilityValidation = require('../../validations/availability.validation.js');
const availabilityController = require('../../controllers/availability.controller.js');
const auth = require('../../middlewares/auth');
const router = express.Router();

router.post('',auth('User','admin'), validate(availabilityValidation.createAvailabilitySchema), availabilityController.createAvailability);
router.put('/:id',auth('User','admin'), validate(availabilityValidation.updateAvailabilitySchema), availabilityController.updateAvailability);
router.get('/:id',auth('User','admin'), availabilityController.getAvailabilityBy);
router.get('', auth('User','admin'),availabilityController.getAllAvailability);
router.delete('/:id',auth('User','admin'), availabilityController.deleteAvailability);

module.exports = router;
