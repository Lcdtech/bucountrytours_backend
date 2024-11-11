const {Template} = require('../models');  

const createTemplate = async (templateData) => {
    try {
      const newTemplate = await Template.create(templateData);
  
      return newTemplate;
    } catch (error) {
      throw new Error(`Unable to create template: ${error.message}`);
    }
  };
const updateTemplate = async (id, templateData) => {
    const template = await Template.findByPk(id);
    
    if (!template) {
        return null;  
    }

    await template.update(templateData);

    return template;  
};

const getTemplateById = async (id) => {
    const template = await Template.findByPk(id);

    return template;  
};

const getAllTemplates = async () => {
    const templates = await Template.findAll();
    return templates;
};

const deleteTemplateById = async (id) => {
    
    const deletedTemplate = await Template.destroy({
        where: { id }
    });

    return deletedTemplate;  
};

module.exports = {
    createTemplate,
    updateTemplate,
    getTemplateById,
    getAllTemplates,
    deleteTemplateById
};
