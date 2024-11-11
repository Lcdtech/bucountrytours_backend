const express = require('express');
const auth = require('../../middlewares/auth');
const { commonController } = require('../../controllers');

const router = express.Router();

router.post('/createUser', commonController.createUsers);
router.get('/Settings', commonController.getUserSettings);
router.get('/getAll', commonController.getAll);

module.exports = router;
