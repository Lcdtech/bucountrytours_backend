
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_cancellationPolicieGroupValidation = require('../../validations/ka_cancellationPolicieGroup.validation');
const ka_cancellationPolicieGroupController = require('../../controllers/ka_cancellationPolicieGroup.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(ka_cancellationPolicieGroupValidation.createKa_bu1Schema), ka_cancellationPolicieGroupController.createKa_themeGroup);
router.put('/:id',auth('User','admin'), validate(ka_cancellationPolicieGroupValidation.updateKa_bu1), ka_cancellationPolicieGroupController.updateKa_themeGroup);
router.get('/:id',auth('User','admin'), ka_cancellationPolicieGroupController.getKa_themeGroupBy);
router.get('',auth('User','admin'), ka_cancellationPolicieGroupController.getAllKa_themeGroup);
router.delete('/:id',auth('User','admin'), ka_cancellationPolicieGroupController.deleteKa_themesGroup);

module.exports = router;