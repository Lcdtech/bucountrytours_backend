
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_ageRangeGroupValidation = require('../../validations/ka_buGroup.validation');
const ka_ageRangeGroupController = require('../../controllers/ka_ageRangeGroup.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post(/*'/createKa_themeGroup '*/'',auth('User','admin'), validate(ka_ageRangeGroupValidation.createKa_bu1Schema), ka_ageRangeGroupController.createKa_themeGroup);
router.put('/:id', auth('User','admin'),validate(ka_ageRangeGroupValidation.updateKa_bu1), ka_ageRangeGroupController.updateKa_themeGroup);
router.get('/:id',auth('User','admin'), ka_ageRangeGroupController.getKa_themeGroupBy);
router.get(/*'/getAllKa_themeGroup'*/'',auth('User','admin'), ka_ageRangeGroupController.getAllKa_themeGroup);
router.delete('/:id',auth('User','admin'), ka_ageRangeGroupController.deleteKa_themesGroup);

module.exports = router;