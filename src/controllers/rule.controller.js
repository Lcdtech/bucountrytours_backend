
const taskController = require('./task.controller');
const { emailDbService, taskService, ruleService } = require('../services');

const createRule = async (req, res) => {
  try {
    const ruleData = req.body;
    const newRule = await ruleService.createRule(ruleData);
    return res.status(201).json({
      message: 'Rule created successfully',
      data: newRule
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating rule',
      error: error.message
    });
  }
};

const getRuleBy = async (req, res) => {
  try {
    const { id } = req.params; 

    const rule = await ruleService.getRuleById(id);

    if (!rule) {
      return res.status(404).json({ message: 'Rule not found' });
    }

    res.status(200).json({
      message: 'Rule fetched successfully',
      data: rule
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rule', error: error.message });
  }
};

const getAllRule = async (req, res) => {
  try {
    const rules = await ruleService.getAllRule();
    return res.status(200).json({
      success: true,
      data: rules,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteRule = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ruleService.deleteRule(id);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error.message === 'Rule not found') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateRule = async (req, res) => {
  try {
      const ruleId = req.params.id;
      const updateData = req.body;

      const updatedRule = await ruleService.updateRule(ruleId, updateData);

      return res.status(200).json({
          message: 'Rule updated successfully',
          data: updatedRule,
      });
  } catch (error) {
      return res.status(400).json({
          message: error.message,
      });
  }
};
module.exports = {
  createRule,
  getRuleBy,
  getAllRule,
  deleteRule,
  updateRule
};
