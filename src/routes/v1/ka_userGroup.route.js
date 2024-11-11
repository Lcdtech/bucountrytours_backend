
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_userGroupValidation = require('../../validations/ka_userGroup.validation');
const ka_userGroupController = require('../../controllers/ka_userGroup.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post(/*'/createKa_themeGroup '*/'',auth('User','admin'), validate(ka_userGroupValidation.createKa_bu4Schema), ka_userGroupController.createKa_themeGroup);
router.put('/:id',auth('User','admin'), validate(ka_userGroupValidation.updateKa_bu4), ka_userGroupController.updateKa_themeGroup);
router.get('/:id',auth('User','admin'), ka_userGroupController.getKa_themeGroupBy);
router.get(/*'/getAllKa_themeGroup'*/'',auth('User','admin'), ka_userGroupController.getAllKa_themeGroup);
router.delete('/:id',auth('User','admin'), ka_userGroupController.deleteKa_themesGroup);

module.exports = router;