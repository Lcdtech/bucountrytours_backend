const taskService = require('../services/task.service');
const emailService = require('../services/email.service');
const emailDbService = require('../services/emailDb.service')
const {Rule} = require('../models');

const createTask = async (req, res) => {
  try {
    const { gmailMessageId, boardId, boardListId,userId, ...taskData } = req.body;
    let emailDetails = { subject: null, name: null};

    if (gmailMessageId) {
      const email = await emailService.getEmailById(gmailMessageId);
      emailDetails = {
        subject: email.subject,
        name: email.name,
      };
     // Check if a task with the same gmailMessageId already exists
    //  const existingTask = await taskService.getTaskByGmailMessageId(gmailMessageId);
    //  if (existingTask) {
    //    return res.status(400).json({
    //      message: 'Task already exists for this Gmail message.',
    //    });
    //  }
   }
    const newTaskData = {
      ...taskData,
      boardId,
      gmailMessageId, 
      boardListId,
      userId,
      subject: emailDetails.subject || taskData.subject,
      name: emailDetails.name || taskData.name,
    };
    if (gmailMessageId) {
      await emailDbService.updatedEmailForTask(gmailMessageId, { isTaskCreated: true });
    }
    const updatedUserId = await processRulesAndCreateTasks(newTaskData);

    if (updatedUserId) {
      newTaskData.userId = updatedUserId || newTaskData.userId;
 // Replace userId with the new one from rules
    }

    const Task = await taskService.createTask(newTaskData);
    res.status(201).json({
      message: 'Task created successfully',
      data: Task,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        message: 'Validation error',
        error: error.message,
        details: error.errors,
      });
    } else {
      res.status(500).json({
        message: 'Error creating Task',
        error: error.message,
      });
    }
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  const { gmailMessageId, ...TaskData } = req.body;

  try {
    let emailDetails = { subject: null, name: null };

    if (gmailMessageId) {
      const email = await emailService.getEmailById(gmailMessageId);
      emailDetails = {
        subject: email.subject,
        name: email.name,
      };
    }

    const updatedTaskData = {
      ...TaskData,
      subject: emailDetails.subject || TaskData.subject,
      name: emailDetails.name || TaskData.name,
    };

    const updatedTask = await taskService.updateTask(id, updatedTaskData);

    res.status(200).json({
      message: 'Task updated successfully',
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating Task',
      error: error.message,
    });
  }
};

const updateStatusTask = async (req, res) => {
  const id = req.params.id;
  const TaskData = req.body;
  try {
    const updatedTask = await taskService.updateStatusTask(id, TaskData);
    await taskService.updateChildTasks(id, TaskData);
    res.status(200).json({
      message: 'Task updated successfully',
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating Task',
      error: error.message,
    });
  }
};
const getTaskBy = async (req, res) => {
  const id = req.params.id;
  
  try {
    const Task = await taskService.getTaskById(id);
    res.status(200).json({
      message: 'Task found',
      data: Task,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Task not found',
      error: error.message,
    });
  }
};

const getAllTask = async (req, res) => {
  const { page = 1, limit = 10, deadline } = req.query;
  

  const { id: userId, role } = req.user;
  try {
    const { tasks, totalTasks } = await taskService.getAllTask(page, limit, deadline, userId, role);
    
    res.status(200).json({
      message: 'All tasks fetched successfully',
      data: tasks,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching tasks',
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  
  try {
    const deletedTask = await taskService.deleteTaskById(id);
    res.status(200).json({
      message: 'Task deleted successfully',
      data: deletedTask,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Task not found',
      error: error.message,
    });
  }
};

const getTaskByThreadId = async (req, res) => {
  try {
    const { threadId } = req.params;
    const task = await taskService.getTaskByThreadId(threadId);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllDeletedTask = async (req, res) => {
  try {
      const deletedTasks = await taskService.getAllDeletedTask();
      res.status(200).json(deletedTasks);
  } catch (error) {
      console.error('Error fetching deleted tasks:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};
const updateParentTask = async (req, res) => {
  const taskId = req.params.id;
  const updateData = req.body;

  const updatedTask = await taskService.updateParentTask(taskId, updateData);

  res.status(200).send(updatedTask); 
};

async function processRulesAndCreateTasks(task) {
  const rules = await Rule.findAll({ where: { type: 'task',  status: true || 1   } });

  for (const rule of rules) {
    const whenConditions = JSON.parse(rule.when);

    const boardMatches = whenConditions.boardId
      ? task.boardId && task.boardId.includes(whenConditions.boardId)
      : true;

    const boardListMatches = whenConditions.boardListId
      ? task.boardListId && task.boardListId.includes(whenConditions.boardListId)
      : true;

    if ( boardMatches && boardListMatches ) {
      const whenConditions1 = JSON.parse(rule.condition);

    const titleMatches = whenConditions1.title
      ? task.title && task.title.includes(whenConditions1.title)
      : true;

     if (titleMatches) {
      const ruleUserId = JSON.parse(rule.action).userId; 

      return ruleUserId;
    }
  }
}
}

module.exports = {
  createTask,
  updateTask,
  getTaskBy,
  getAllTask,
  deleteTask,
  updateStatusTask,
  getTaskByThreadId,
  getAllDeletedTask,
  updateParentTask,
  processRulesAndCreateTasks
};
