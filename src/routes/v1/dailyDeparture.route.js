const express = require('express');
const dailyDepartureController = require('../../controllers/dailyDeparture.controller.js');
const auth = require('../../middlewares/auth');

const router = express.Router();


router.get('/', auth('User','admin'),dailyDepartureController.getAllDailyDepartures);


module.exports = router;
