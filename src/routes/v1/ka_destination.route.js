
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_destinationValidation = require('../../validations/ka_bu1.validation');
const ka_destinationController = require('../../controllers/ka_destination.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(ka_destinationValidation.createKa_bu1Schema), ka_destinationController.createKa_destination);
router.put('/:id',auth('User','admin'), validate(ka_destinationValidation.updateKa_bu1), ka_destinationController.updateKa_destination);
router.get('/:id',auth('User','admin'), ka_destinationController.getKa_destinationBy);
router.get('',auth('User','admin'), ka_destinationController.getAllKa_destination);
router.delete('/:id',auth('User','admin'), ka_destinationController.deletedKa_destination);

module.exports = router;