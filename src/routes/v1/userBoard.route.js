const express = require('express');
const validate = require('../../middlewares/validate');
const userBoardValidation = require('../../validations/userBoard.validation.js');
const userBoardController = require('../../controllers/userBoard.controller.js');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/createUserBoard',auth('User','admin'), validate(userBoardValidation.createUserBoardSchema), userBoardController.createUserBoard);
router.put('/updateUserBoard/:id',auth('User','admin'), validate(userBoardValidation.updateUserBoardSchema), userBoardController.updateUserBoard);
router.get('/getUserBoardBy/:userId',auth('User','admin'), userBoardController.getUserBoardBy);
router.get('/getAllUserBoard',auth('User','admin'), userBoardController.getAllUserBoard);
router.delete('/deleteUserBoard/:id',auth('User','admin'), userBoardController.deleteUserBoard);

module.exports = router;
