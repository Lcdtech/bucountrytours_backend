
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_whatToBringGroupValidation = require('../../validations/ka_buGroup.validation');
const ka_whatToBringGroupController = require('../../controllers/ka_whatToBringGroup.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post(/*'/createKa_themeGroup '*/'',auth('User','admin'), validate(ka_whatToBringGroupValidation.createKa_bu1Schema), ka_whatToBringGroupController.createKa_themeGroup);
router.put('/:id',auth('User','admin'), validate(ka_whatToBringGroupValidation.updateKa_bu1), ka_whatToBringGroupController.updateKa_themeGroup);
router.get('/:id',auth('User','admin'), ka_whatToBringGroupController.getKa_themeGroupBy);
router.get(/*'/getAllKa_themeGroup'*/'',auth('User','admin'), ka_whatToBringGroupController.getAllKa_themeGroup);
router.delete('/:id',auth('User','admin'), ka_whatToBringGroupController.deleteKa_themesGroup);

module.exports = router;