const express = require('express');
const validate = require('../../middlewares/validate');
const taskValidation = require('../../validations/task.validation');
const taskController = require('../../controllers/task.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/createTask',auth('User','admin'),validate(taskValidation.createTask), taskController.createTask);
router.put('/updateTask/:id',auth('User','admin'), validate(taskValidation.updateTask), taskController.updateTask);
router.put('/updateStatusTask/:id', validate(taskValidation.updateStatusTask), taskController.updateStatusTask);
router.get('/getTaskBy/:id',auth('User','admin'),taskController.getTaskBy);
router.get('/getTaskBythreadId/:threadId', taskController.getTaskByThreadId);
router.get('/getAllTask', auth('User','admin'), taskController.getAllTask);
router.delete('/deleteTask/:id', auth('User','admin'),taskController.deleteTask);
router.get('/getAllDeletedTask',auth('User','admin'),taskController.getAllDeletedTask)
router.put('/updateParentTask/:id',auth('User','admin'), validate(taskValidation.updateParentTask), taskController.updateParentTask);

module.exports = router;
