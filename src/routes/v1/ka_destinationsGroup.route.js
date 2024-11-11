
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_destinationsGroupValidation = require('../../validations/ka_buGroup.validation');
const ka_destinationsGroupController = require('../../controllers/ka_destinationsGroup.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post(/*'/createKa_themeGroup '*/'',auth('User','admin'), validate(ka_destinationsGroupValidation.createKa_bu1Schema), ka_destinationsGroupController.createKa_destinationsGroup);
router.put('/:id',auth('User','admin'), validate(ka_destinationsGroupValidation.updateKa_bu1), ka_destinationsGroupController.updateKa_destinationsGroup);
router.get('/:id',auth('User','admin'), ka_destinationsGroupController.getKa_destinationsGroupBy);
router.get(/*'/getAllKa_themeGroup'*/'',auth('User','admin'), ka_destinationsGroupController.getAllKa_destinationsGroup);
router.delete('/:id',auth('User','admin'), ka_destinationsGroupController.deleteKa_destinationsGroup);

module.exports = router;