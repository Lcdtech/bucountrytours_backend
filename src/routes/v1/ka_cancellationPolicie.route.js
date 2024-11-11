
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_cancellationPolicieValidation = require('../../validations/addProperty.validation');
const ka_cancellationPolicieController = require('../../controllers/ka_cancellationPolicie.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(ka_cancellationPolicieValidation.createKa_bu4Schema), ka_cancellationPolicieController.createKa_theme);
router.put('/:id',auth('User','admin'), validate(ka_cancellationPolicieValidation.updateKa_bu4), ka_cancellationPolicieController.updateKa_theme);
router.get('/:id',auth('User','admin'), ka_cancellationPolicieController.getKa_themeBy);
router.get('',auth('User','admin'), ka_cancellationPolicieController.getAllKa_theme);
router.delete('/:id',auth('User','admin'), ka_cancellationPolicieController.deletedKa_theme);

module.exports = router;