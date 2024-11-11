const express = require('express');
const validate = require('../../middlewares/validate');
const mappingBoardGmailUserValidation = require('../../validations/mappingBoardGmailUser.validation.js');
const mappingBoardGmailUserController = require('../../controllers/mappingBoardGmailUser.controller.js');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/createMappingBoardGmailUser',auth('User','admin'), validate(mappingBoardGmailUserValidation.createMappingBoardGmailUserSchema), mappingBoardGmailUserController.createMappingBoardGmailUser);
router.put('/updateMappingBoardGmailUser/:id',auth('User','admin'), validate(mappingBoardGmailUserValidation.updateMappingBoardGmailUserSchema), mappingBoardGmailUserController.updateMappingBoardGmailUser);
router.get('/getMappingBoardGmailUserBy/:id',auth('User','admin'), mappingBoardGmailUserController.getMappingBoardGmailUserBy);
router.get('/getAllMappingBoardGmailUser',auth('User','admin'), mappingBoardGmailUserController.getAllMappingBoardGmailUser);
router.delete('/deleteMappingBoardGmailUser/:id',auth('User','admin'), mappingBoardGmailUserController.deleteMappingBoardGmailUser);

module.exports = router;
