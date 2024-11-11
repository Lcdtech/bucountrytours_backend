const express = require('express');
const validate = require('../../middlewares/validate');
const credentailValidation = require('../../validations/credentail.validation.js');
const credentailController = require('../../controllers/credentail.controller.js');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/createCredentail', auth('User','admin'),validate(credentailValidation.createCredentialSchema), credentailController.createCredential);
// router.put('/updateCredentail/:id', validate(credentailValidation.updateCredentail), credentailController.updateCredentail);
// router.get('/getCredentailBy/:id', credentailController.getCredentailBy);
// router.get('/getAllCredentail', credentailController.getAllCredentail);
// router.delete('/deleteCredentail/:id', credentailController.deleteCredentail);
router.get('/updateTokenWithClientId/:id', credentailController.updateTokenWithClientId);
router.get('/google/oauth2callback', credentailController.handleAuthCallback);
module.exports = router;
