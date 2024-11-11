const express = require('express');
const validate = require('../../middlewares/validate');
const accommodationValidation = require('../../validations/accommodation.validation.js');
const accommodationController = require('../../controllers/accommodation.controller.js');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('', validate(accommodationValidation.createAccommodationSchema), accommodationController.createAccommodation);
router.put('/:id', validate(accommodationValidation.updateAccommodation), accommodationController.updateAccommodation);
router.get('/:id', accommodationController.getAccommodationById);
router.get('', accommodationController.getAllAccommodations);
router.delete('/:id', accommodationController.deleteAccommodation);

module.exports = router;
