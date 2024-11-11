const express = require('express');
const validate = require('../../middlewares/validate');
const groupBoardValidation = require('../../validations/groupBoard.validation.js');
const groupBoardController = require('../../controllers/groupBoard.controller.js');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/createGroupBoard',auth('User','admin'), validate(groupBoardValidation.creategroupBoardSchema), groupBoardController.createGroupBoard);
router.put('/updategroupBoard', auth('User','admin'),validate(groupBoardValidation.updategroupBoardSchema), groupBoardController.updateGroupBoard);
router.get('/getGroupBoardBy/:groupUserId',auth('User','admin'), groupBoardController.getGroupBoardBy);
router.get('/getAllGroupBoard',auth('User','admin'), groupBoardController.getAllGroupBoard);
router.delete('/deleteGroupBoard/:id',auth('User','admin'), groupBoardController.deleteGroupBoard);

module.exports = router;