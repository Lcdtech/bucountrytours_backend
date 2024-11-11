
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_inclusionsValidation = require('../../validations/ka_bu1.validation');
const ka_inclusionsController = require('../../controllers/ka_inclusions.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(ka_inclusionsValidation.createKa_bu1Schema), ka_inclusionsController.createKa_inclusions);
router.put('/:id',auth('User','admin'), validate(ka_inclusionsValidation.updateKa_bu1), ka_inclusionsController.updateKa_inclusions);
router.get('/:id',auth('User','admin'), ka_inclusionsController.getKa_inclusionsBy);
router.get('',auth('User','admin'), ka_inclusionsController.getAllKa_inclusions);
router.delete('/:id',auth('User','admin'), ka_inclusionsController.deleteKa_inclusions);

module.exports = router;