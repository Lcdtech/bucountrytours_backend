const express = require('express');
const validate = require('../../middlewares/validate');
const templateValidation = require('../../validations/template.validation');
const templateController = require('../../controllers/template.controller');
const upload = require('../../utils/uploades');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/createTemplate',auth('User','admin'), validate(templateValidation.createTemplate), templateController.createTemplate);
router.put('/updateTemplate/:id',auth('User','admin'), validate(templateValidation.updateTemplate), templateController.updateTemplate);
router.get('/getTemplateBy/:id',auth('User','admin'), templateController.getTemplateBy);
router.get('/getAllTemplate',auth('User','admin'), templateController.getAllTemplate);
router.delete('/deleteTemplate/:id',auth('User','admin'), templateController.deleteTemplate);

router.post('/singleImage', upload.single('image'), templateController.uploadImage);

router.post('/images', upload.array('image', 15), templateController.uploadImages);

module.exports = router;
