const express = require('express');
const validate = require('../../middlewares/validate');
const tokenValidation = require('../../validations/token.validation.js');
const tokenController = require('../../controllers/token.controller.js');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/createToken',auth('User','admin'), validate(tokenValidation.createTokenSchema), tokenController.createToken);
// router.put('/updateToken/:id', validate(tokenValidation.updateToken), tokenController.updateToken);
// router.get('/getTokenBy/:id', tokenController.getTokenBy);
// router.get('/getAllToken', tokenController.getAllToken);
// router.delete('/deleteToken/:id', tokenController.deleteToken);

module.exports = router;
