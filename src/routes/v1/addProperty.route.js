const express = require('express');
const validate = require('../../middlewares/validate');
const addPropertyValidation = require('../../validations/addProperty.validation');
const addPropertyController = require('../../controllers/addProperty.controller');
const auth = require('../../middlewares/auth');
const router = express.Router();

router.post('/createaddProperty',auth('User','admin'), validate(addPropertyValidation.createAddPropertySchema), addPropertyController.createAddProperty);
router.put('/updateaddProperty/:id',auth('User','admin'), validate(addPropertyValidation.updateAddProprty), addPropertyController.updateAddProperty);
router.get('/getAddPropertyBy/:id',auth('User','admin'), addPropertyController.getAddPropertyBy);
router.get('/getAllAddProperty', auth('User','admin'),addPropertyController.getAllAddProperty);
router.delete('/deleteAddProperty/:id',auth('User','admin'), addPropertyController.deleteAddProperty);

module.exports = router;
