const Joi = require('joi');

const createTask = Joi.object({
  gmailMessageId: Joi.string().optional(),
  title: Joi.string().optional(),
  taskstatus: Joi.string().required(),
  projectBoard: Joi.string().valid('Ideas', 'Planned', 'In progress', 'Done').optional(),
  reminder: Joi.string().valid('Later today', 'Tomorrow', 'In two days', 'Next week', 'Pick a date', 'Add this item to My Day plan', 'Also update the deadline date').optional(),
  myDayPlan: Joi.string().valid('Today', 'Tomorrow', 'In two days', 'Next week', 'Pick a date', 'Also update the deadline date').optional(),
  notes: Joi.string().optional(),
  nextStep: Joi.string().valid('Later today', 'Tomorrow', 'In two days', 'Next week', 'Pick a date', 'Add this item to My Day plan', 'Also update the deadline date').optional(),
  kickOff: Joi.string().valid('Later today', 'Tomorrow', 'In two days', 'Next week', 'Pick a date').optional(),
  priority: Joi.string().valid('Low', 'Medium', 'High', 'Urgent').optional(),
  taskStatus1: Joi.string().valid('On Track', 'Working on', 'Waiting', 'Stuck').optional(),
  color: Joi.string().optional(),
  attachment: Joi.string().optional(),
  deadline: Joi.date().optional(),
  userId: Joi.string().uuid().optional(),
  boardId: Joi.string().uuid().optional(),
  boardListId: Joi.string().uuid().optional(),
});

const updateTask = Joi.object({
  gmailMessageId: Joi.string().optional(),
  title: Joi.string().optional(),
  taskstatus: Joi.string().required(),
  projectBoard: Joi.string().valid('Ideas', 'Planned', 'In progress', 'Done').optional(),
  reminder: Joi.string().valid('Later today', 'Tomorrow', 'In two days', 'Next week', 'Pick a date', 'Add this item to My Day plan', 'Also update the deadline date').optional(),
  myDayPlan: Joi.string().valid('Today', 'Tomorrow', 'In two days', 'Next week', 'Pick a date', 'Also update the deadline date').optional(),
  notes: Joi.string().optional(),
  nextStep: Joi.string().valid('Later today', 'Tomorrow', 'In two days', 'Next week', 'Pick a date', 'Add this item to My Day plan', 'Also update the deadline date').optional(),
  kickOff: Joi.string().valid('Later today', 'Tomorrow', 'In two days', 'Next week', 'Pick a date').optional(),
  priority: Joi.string().valid('Low', 'Medium', 'High', 'Urgent').optional(),
  taskStatus1: Joi.string().valid('On Track', 'Working on', 'Waiting', 'Stuck').optional(),
  color: Joi.string().optional(),
  attachment: Joi.string().optional(),
  deadline: Joi.date().optional(),
  userId: Joi.string().uuid().optional(),
  boardId: Joi.string().uuid().optional(),
  boardListId: Joi.string().uuid().optional(),
  parentTaskID: Joi.string().uuid().optional(),
  parentTaskStatus: Joi.boolean().optional(),
});

const updateStatusTask = Joi.object({
  boardId: Joi.string().uuid().optional(),
  boardListId: Joi.string().uuid().optional(),
});

const updateParentTask = Joi.object({
  parentTaskID: Joi.string().uuid().optional(),
  parentTaskStatus: Joi.boolean().optional(),
});
module.exports = { createTask, updateTask, updateStatusTask,updateParentTask };
