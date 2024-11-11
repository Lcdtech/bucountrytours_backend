const express = require('express');
const validate = require('../../middlewares/validate');
const boardListValidation = require('../../validations/boardList.validation');
const boardListController = require('../../controllers/boardList.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/createBoardList', auth('User','admin'),validate(boardListValidation.createBoardList), boardListController.createBoardList);
router.put('/updateBoardList/:id', auth('User','admin'),validate(boardListValidation.updateBoardList), boardListController.updateBoardList);
router.get('/getBoardListBy/:id', boardListController.getBoardListBy);
router.get('/getAllBoardList', auth('User','admin'),boardListController.getAllBoardList);
router.delete('/deleteBoardList/:id',auth('User','admin'), boardListController.deleteBoardList);
router.get('/getBoardListByboardId/:boardId',auth('User','admin'), boardListController.getBoardListByboardId);
router.put('/updateBoardListSequence/:boardId',auth('User','admin'), boardListController.updateBoardListSequence);

module.exports = router;
