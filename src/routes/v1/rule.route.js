const express = require('express');
const validate = require('../../middlewares/validate.js');
const ruleValidation = require('../../validations/rule.validation.js');
const ruleController = require('../../controllers/rule.controller.js');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/createRule',auth('User','admin'), validate(ruleValidation.createRuleSchema), ruleController.createRule);
router.put('/updateRule/:id',auth('User','admin'), validate(ruleValidation.updateRule), ruleController.updateRule);
router.get('/getRuleBy/:id',auth('User','admin'), ruleController.getRuleBy);
router.get('/getAllRule',auth('User','admin'), ruleController.getAllRule);
router.delete('/deleteRule/:id',auth('User','admin'), ruleController.deleteRule);

module.exports = router;
