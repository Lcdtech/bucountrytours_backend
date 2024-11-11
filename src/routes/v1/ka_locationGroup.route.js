
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_themeGroupValidation = require('../../validations/ka_buGroup.validation');
const ka_locationGroupController = require('../../controllers/ka_locationGroup.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post(/*'/createKa_themeGroup '*/'',auth('User','admin'), validate(ka_themeGroupValidation.createKa_bu1Schema), ka_locationGroupController.createKa_themeGroup);
router.put('/:id',auth('User','admin'), validate(ka_themeGroupValidation.updateKa_bu1), ka_locationGroupController.updateKa_themeGroup);
router.get('/:id',auth('User','admin'), ka_locationGroupController.getKa_themeGroupBy);
router.get(/*'/getAllKa_themeGroup'*/'',auth('User','admin'), ka_locationGroupController.getAllKa_themeGroup);
router.delete('/:id',auth('User','admin'), ka_locationGroupController.deleteKa_themesGroup);

module.exports = router;