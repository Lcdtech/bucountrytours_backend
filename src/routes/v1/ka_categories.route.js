
const express = require('express');
const validate = require('../../middlewares/validate');
const ka_categoriesValidation = require('../../validations/ka_bu1.validation');
const ka_categoriesController = require('../../controllers/ka_categories.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(ka_categoriesValidation.createKa_bu1Schema), ka_categoriesController.createKa_categories);
router.put('/:id',auth('User','admin'), validate(ka_categoriesValidation.updateKa_bu1), ka_categoriesController.updateKa_categories);
router.get('/:id',auth('User','admin'), ka_categoriesController.getKa_categoriesBy);
router.get('',auth('User','admin'), ka_categoriesController.getAllKa_categories);
router.delete('/:id',auth('User','admin'), ka_categoriesController.deletedKa_categories);

module.exports = router;