const templateService = require('../services/template.service');
const sanitizeHtml = require('sanitize-html');
const he = require('he');

const createTemplate = async (req, res) => {
    try {
        const templateData = req.body;

        let sanitizedBody = templateData.body ? he.decode(templateData.body) : '';
        const getSanitizeOptions = (allowedTags, allowedAttributes) => {
            return {
                allowedTags: allowedTags || sanitizeHtml.defaults.allowedTags.concat(['img', 'figure']),
                allowedAttributes: allowedAttributes || {
                    '*': ['*'], 
                    'img': ['src', 'alt', 'width', 'height'],
                    'figure': ['class']
                },
                allowedSchemes: ['http', 'https', 'data'],
                allowedSchemesByTag: {
                    img: ['http', 'https', 'data'] 
                }
            };
        };

        const dynamicAllowedTags = ['h1', 'h2', 'p', 'img', 'figure', 'strong', 'em'];
        const dynamicAllowedAttributes = {
            '*': ['*'],
            'img': ['src', 'alt', 'width', 'height'],
            'figure': ['class']
        };

        if (sanitizedBody) {
            sanitizedBody = sanitizeHtml(sanitizedBody, getSanitizeOptions(dynamicAllowedTags, dynamicAllowedAttributes));
        }
        const result = await templateService.createTemplate({
            ...templateData,
            body: sanitizedBody  
        });

        return res.status(201).json({
            message: 'Template created successfully!',
            data: result
        });
    } catch (error) {
        console.error("Error creating template:", error); 
        return res.status(500).json({
            message: 'An error occurred while creating the template.',
            error: error.message
        });
    }
};

const updateTemplate = async (req, res) => {
    try {
        const { id } = req.params; 
        const templateData = req.body;  
        
        let sanitizedBody = templateData.body ? he.decode(templateData.body) : '';
        const getSanitizeOptions = (allowedTags, allowedAttributes) => {
            return {
                allowedTags: allowedTags || sanitizeHtml.defaults.allowedTags.concat(['img', 'figure']),
                allowedAttributes: allowedAttributes || {
                    '*': ['*'], 
                    'img': ['src', 'alt', 'width', 'height'],
                    'figure': ['class']
                },
                allowedSchemes: ['http', 'https', 'data'], 
                allowedSchemesByTag: {
                    img: ['http', 'https', 'data']
                }
            };
        };

        const dynamicAllowedTags = ['h1', 'h2', 'p', 'img', 'figure', 'strong', 'em'];
        const dynamicAllowedAttributes = {
            '*': ['*'],
            'img': ['src', 'alt', 'width', 'height'],
            'figure': ['class']
        };

        if (sanitizedBody) {
            sanitizedBody = sanitizeHtml(sanitizedBody, getSanitizeOptions(dynamicAllowedTags, dynamicAllowedAttributes));
        }
        const updatedData = {
            ...templateData,
            body: sanitizedBody 
        };

        const updatedTemplate = await templateService.updateTemplate(id, updatedData);

        if (!updatedTemplate) {
            return res.status(404).json({ success: false, message: 'Template not found' });
        }

        res.status(200).json({ success: true, data: updatedTemplate });
    } catch (error) {
        console.error("Error updating template:", error); 
        res.status(500).json({ success: false, message: error.message });
    }
};

const getTemplateBy = async (req, res) => {
    try {
        const { id } = req.params; 

        const template = await templateService.getTemplateById(id);

        if (!template) {
            return res.status(404).json({ success: false, message: 'Template not found' });
        }

        res.status(200).json({ success: true, data: template });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllTemplate = async (req, res) => {
    try {
        const templates = await templateService.getAllTemplates();

        if (!templates || templates.length === 0) {
            return res.status(200).json({ success: false, message: 'No templates found' });
        }

        res.status(200).json({ success: true, data: templates });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteTemplate = async (req, res) => {
    try {
        const { id } = req.params; 

        const deleted = await templateService.deleteTemplateById(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Template not found' });
        }

        res.status(200).json({ success: true, message: 'Template deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const uploadImage = async (req, res) => {
    try {
      const image = req.file.filename;
      if (req.file === undefined) {
        return res.status(401).send({ message: `You must select a file.` });
      }
      res.send({ message: 'image uploaded sucessfully', image });
    } catch (error) {
      return res.status(500).send(`Error when trying upload images: ${error}`);
    }
  };
  
  const uploadImages = async (req, res) => {
    try {
      const images = req.files;
  
      if (!images || images.length === 0) {
        return res.status(400).send('You must select at least one file.');
      }
  
      const fileInformation = images.map((file) => {
        return file.filename.trim();
      });
    
  
      res.send({ message: 'Images uploaded successfully', fileInformation: fileInformation });
    } catch (error) {
      console.error(error);
      return res.status(500).send(`Error when trying to upload images: ${error}`);
    }
  };
  

module.exports = {
    createTemplate,
    updateTemplate,
    getTemplateBy,
    getAllTemplate,
    deleteTemplate,
    uploadImage,
    uploadImages
};
