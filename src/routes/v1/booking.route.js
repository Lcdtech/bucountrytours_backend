const express = require('express');
const validate = require('../../middlewares/validate');
const bookingValidation = require('../../validations/booking.validation.js');
const bookingController = require('../../controllers/booking.controller.js');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(bookingValidation.createBookingSchema), bookingController.createBooking);
router.put('/:id',auth('User','admin'), validate(bookingValidation.updateBooking), bookingController.updateBooking);
router.get('/:id',auth('User','admin'), bookingController.getBookingById);
router.get('', auth('User','admin'),bookingController.getAllBookings);
router.delete('/:id',auth('User','admin'), bookingController.deleteBooking);

module.exports = router;
