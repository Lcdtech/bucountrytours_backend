const express = require('express');
const validate = require('../../middlewares/validate');
const ka_inclusionsGroupValidation = require('../../validations/ka_buGroup.validation');
const ka_inclusionsGroupController = require('../../controllers/ka_inclusionsGroup.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(ka_inclusionsGroupValidation.createKa_bu1Schema), ka_inclusionsGroupController.createKa_inclusionsGroup);
router.put('/:id',auth('User','admin'), validate(ka_inclusionsGroupValidation.updateKa_bu1), ka_inclusionsGroupController.updateKa_inclusionsGroup);
router.get('/:id',auth('User','admin'), ka_inclusionsGroupController.getKa_inclusionsGroupBy);
router.get('',auth('User','admin'), ka_inclusionsGroupController.getAllKa_inclusionsGroup);
router.delete('/:id',auth('User','admin'), ka_inclusionsGroupController.deleteKa_inclusionsGroup);

module.exports = router;