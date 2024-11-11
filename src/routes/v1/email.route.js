const express = require('express');
const emailController = require('../../controllers/email.controller.js');
const { sendEmailSchema, updateStatusEmail,updatedMessageRead,updateGmailUser,updatedEmailForTask,updateEmail } = require('../../validations/email.validation');
const { sendSubEmailSchema, updateStatusSubEmail } = require('../../validations/subEmail.validation.js');
const auth = require('../../middlewares/auth');
const validateRequest = require('../../middlewares/validateRequest');

const router = express.Router();

router.get('/labels', auth('User','admin'),emailController.getLabels);
router.get('/getEmailsByDate/:boardId',auth('User','admin'), emailController.getEmailsByDate);
router.put('/updateStatusEmail/:gmailMessageId',auth('User','admin'), validateRequest(updateStatusEmail),emailController.updateStatusEmail);
router.put('/updatedMessageRead/:gmailMessageId',auth('User','admin'), validateRequest(updatedMessageRead),emailController.updatedMessageRead);
router.get('/getEmailBy/:gmailMessageId', auth('User','admin'),emailController.getEmailBy);
router.post('/send', validateRequest(sendEmailSchema), emailController.sendEmail);
router.delete('/deletemail/:id',auth('User','admin'), emailController.deleteEmail);
router.post('/reply/:id', emailController.replyToEmail);
router.get('/getAllDeletedMail',auth('User','admin'),emailController.getAllDeletedMail)

router.get('/getTheLinkedEmail', auth('User','admin'),emailController.getTheLinkedEmail);
router.put('/updatedEmailForTask/:gmailMessageId',auth('User','admin'),validateRequest(updatedEmailForTask),emailController.updatedEmailForTask);

router.put('/updateGmailUser/:id', auth('User','admin'),validateRequest(updateGmailUser),emailController.updateGmailUser);
router.put('/updateBoardId',auth('User','admin'),emailController.updateBoardId);

router.put('/updateEmail/:gmailMessageId',auth('User','admin'), validateRequest(updateEmail),emailController.updateEmail);

router.post('/compose',auth('User','admin'), emailController.compose);

module.exports = router;
