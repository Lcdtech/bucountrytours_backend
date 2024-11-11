const express = require('express');
const validate = require('../../middlewares/validate');
const recurrenceValidation = require('../../validations/recurrence.validation.js');
const recurrenceController = require('../../controllers/recurrence.controller.js');
const auth = require('../../middlewares/auth');
const router = express.Router();

router.post('',auth('User','admin'), validate(recurrenceValidation.createRecurrenceSchema), recurrenceController.createRecurrence);
router.put('/:id',auth('User','admin'), validate(recurrenceValidation.updateRecurrenceSchema), recurrenceController.updateRecurrence);
router.get('/:id',auth('User','admin'), recurrenceController.getRecurrenceBy);
router.get('', auth('User','admin'),recurrenceController.getAllRecurrence);
router.delete('/:id',auth('User','admin'), recurrenceController.deleteRecurrence);

module.exports = router;
