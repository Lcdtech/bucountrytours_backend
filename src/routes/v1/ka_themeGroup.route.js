
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_themeGroupValidation = require('../../validations/ka_buGroup.validation');
const ka_themeGroupController = require('../../controllers/ka_themeGroup.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post(/*'/createKa_themeGroup '*/'',auth('User','admin'), validate(ka_themeGroupValidation.createKa_bu1Schema), ka_themeGroupController.createKa_themeGroup);
router.put('/:id',auth('User','admin'), validate(ka_themeGroupValidation.updateKa_bu1), ka_themeGroupController.updateKa_themeGroup);
router.get('/:id',auth('User','admin'), ka_themeGroupController.getKa_themeGroupBy);
router.get(/*'/getAllKa_themeGroup'*/'',auth('User','admin'), ka_themeGroupController.getAllKa_themeGroup);
router.delete('/:id',auth('User','admin'), ka_themeGroupController.deleteKa_themesGroup);

module.exports = router;