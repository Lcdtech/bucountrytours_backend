const express = require('express');
const validate = require('../../middlewares/validate');
const boardValidation = require('../../validations/board.validation');
const boardController = require('../../controllers/board.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/createBoard',auth('User','admin'), validate(boardValidation.createBoardSchema), boardController.createBoard);
router.put('/updateBoard/:id', auth('User','admin'),validate(boardValidation.updateBoard), boardController.updateBoard);
router.get('/getBoardBy/:id',auth('User','admin'), boardController.getBoardBy);
router.get('/getAllBoard',auth('User','admin'), boardController.getAllBoard);
router.delete('/deleteBoard/:id', auth('User','admin'),boardController.deleteBoard);

module.exports = router;
