const express = require('express');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation.js');
const productController = require('../../controllers/product.controller.js');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('',auth('User','admin'), validate(productValidation.createProductSchema), productController.createProduct);
router.put('/:id',auth('User','admin'), validate(productValidation.updateProduct), productController.updateProduct);
router.get('/:id',auth('User','admin'), productController.getProductById);
router.get('', auth('User','admin'),productController.getAllProducts);
router.delete('/:id',auth('User','admin'), productController.deleteProduct);

module.exports = router;
