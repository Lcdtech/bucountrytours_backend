const express = require('express');
const validate = require('../../middlewares/validate');
const groupUserValidation = require('../../validations/groupUser.validation.js');
const groupUserController = require('../../controllers/groupUser.controller.js');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/createGroupUser',auth('User','admin'), validate(groupUserValidation.creategroupUserSchema), groupUserController.createGroupUser);
router.put('/updategroupUser/:id',auth('User','admin'), validate(groupUserValidation.updategroupUser), groupUserController.updateGroupUser);
router.get('/getGroupUserBy/:id',auth('User','admin'), groupUserController.getGroupUserBy);
router.get('/getAllGroupUser', auth('User','admin'),groupUserController.getAllGroupUser);
router.delete('/deleteGroupUser/:id',auth('User','admin'), groupUserController.deleteGroupUser);

module.exports = router;