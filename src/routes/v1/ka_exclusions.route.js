
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_exclusionsValidation = require('../../validations/ka_bu1.validation');
const ka_exclusionsController = require('../../controllers/ka_exclusions.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(ka_exclusionsValidation.createKa_bu1Schema), ka_exclusionsController.createKa_exclusions);
router.put('/:id',auth('User','admin'), validate(ka_exclusionsValidation.updateKa_bu1), ka_exclusionsController.updateKa_exclusions);
router.get('/:id',auth('User','admin'), ka_exclusionsController.getKa_exclusionsBy);
router.get('',auth('User','admin'), ka_exclusionsController.getAllKa_exclusions);
router.delete('/:id',auth('User','admin'), ka_exclusionsController.deletedKa_exclusions);

module.exports = router;