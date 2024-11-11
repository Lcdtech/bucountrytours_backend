const express = require('express');
const validate = require('../../middlewares/validate');
const taskWtcontactValidation = require('../../validations/taskWtcontact.validation');
const taskWtcontactController = require('../../controllers/taskWtcontact.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/createTaskWtcontact',auth('User','admin'), validate(taskWtcontactValidation.createTaskWtcontact), taskWtcontactController.createTaskWtcontact);
router.put('/updateTaskWtcontact/:id',auth('User','admin'), validate(taskWtcontactValidation.updatetaskWtcontact), taskWtcontactController.updateTaskWtcontact);
router.get('/getTaskWtcontactBy/:id',auth('User','admin'), taskWtcontactController.gettaskWtcontactBy);
router.get('/getAllTaskWtcontact',auth('User','admin'), taskWtcontactController.getAlltaskWtcontact);
router.delete('/deleteTaskWtcontact/:id',auth('User','admin'), taskWtcontactController.deletetaskWtcontact);

module.exports = router;
