
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_categoriesGroupValidation = require('../../validations/ka_buGroup.validation');
const ka_categoriesGroupController = require('../../controllers/ka_categoriesGroup.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post(/*'/createKa_themeGroup '*/'',auth('User','admin'), validate(ka_categoriesGroupValidation.createKa_bu1Schema), ka_categoriesGroupController.createKa_themeGroup);
router.put('/:id', auth('User','admin'),validate(ka_categoriesGroupValidation.updateKa_bu1), ka_categoriesGroupController.updateKa_themeGroup);
router.get('/:id',auth('User','admin'), ka_categoriesGroupController.getKa_themeGroupBy);
router.get(/*'/getAllKa_themeGroup'*/'',auth('User','admin'), ka_categoriesGroupController.getAllKa_themeGroup);
router.delete('/:id',auth('User','admin'), ka_categoriesGroupController.deleteKa_themesGroup);

module.exports = router;