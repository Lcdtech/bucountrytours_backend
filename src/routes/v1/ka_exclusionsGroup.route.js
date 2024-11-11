
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_exclusionsGroupValidation = require('../../validations/ka_buGroup.validation');
const ka_exclusionsGroupController = require('../../controllers/ka_exclusionsGroup.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(ka_exclusionsGroupValidation.createKa_bu1Schema), ka_exclusionsGroupController.createKa_exclusionsGroup);
router.put('/:id',auth('User','admin'), validate(ka_exclusionsGroupValidation.updateKa_bu1), ka_exclusionsGroupController.updateKa_exclusionsGroup);
router.get('/:id',auth('User','admin'), ka_exclusionsGroupController.getKa_exclusionsGroupBy);
router.get('',auth('User','admin'), ka_exclusionsGroupController.getAllKa_exclusionsGroup);
router.delete('/:id',auth('User','admin'), ka_exclusionsGroupController.deleteKa_exclusionsGroup);

module.exports = router;