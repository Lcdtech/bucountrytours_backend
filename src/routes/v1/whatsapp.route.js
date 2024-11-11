const express = require('express');
const whatsappController = require('../../controllers/whatsapp.controller');
const whatsappValidation = require('../../validations/chat.validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/qr',auth('User','admin'), whatsappController.getQrCodeImage);
router.post('/sendMessage',auth('User','admin'), whatsappController.sendMessage);
router.get('/getAllChatByContactId/:contactId',auth('User','admin'), whatsappController.getAllChatByContactId);
router.get('/getAllChatByContactNo/:contactNo',auth('User','admin'), whatsappController.getAllChatByContactNo);
router.post('/generate-qr',auth('User','admin'), whatsappController.generateNewQrCode);
router.get('/getAllProfile',auth('User','admin'), whatsappController.getAllProfile);
router.get('/getProfileByClientId/:clientId',auth('User','admin'), whatsappController.getProfileByClientId);
router.get('/logoutWhatsapp/:clientId',auth('User','admin'), whatsappController.logoutWhatsapp);

module.exports = router;