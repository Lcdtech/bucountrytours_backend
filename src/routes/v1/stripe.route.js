
const express = require('express');
const stripeController = require('../../controllers/stripe.controller');

const router = express.Router();

router.post('/', stripeController.paymentIntent);


module.exports = router;
