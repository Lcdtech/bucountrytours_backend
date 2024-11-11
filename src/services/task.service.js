const {Task, Email,BoardList, User} = require('../models'); 
const { Sequelize } = require('sequelize');


const createTask = async (taskData) => {
  try {
    const result = await Task.create(taskData);
    return result;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error; 
  }
};

  const updateTask = async (id, taskData) => {
    try {
      const [updated] = await Task.update(taskData, {
        where: { id },
        returning: true, 
      });
      if (updated === 0) {
        throw new Error('Task not found');
      }
      const updatedTask = await Task.findByPk(id);
      return updatedTask;
    } catch (error) {
      throw new Error('Error updating Task: ' + error.message);
    }
  };

  const updateStatusTask = async (id, taskData) => {
    try {
      const [updated] = await Task.update(taskData, {
        where: { id },
        returning: true, 
      });
      if (updated === 0) {
        throw new Error('Task not found');
      }
      const updatedTask = await Task.findByPk(id);
      return updatedTask;
    } catch (error) {
      throw new Error('Error updating Task: ' + error.message);
    }
  };

  const updateChildTasks = async (parentId, taskData) => {
    try {
      const [updated] = await Task.update(taskData, {
        where: { parentTaskID: parentId },
        returning: true,
      });
  
      if (updated === 0) {
      } else {
        console.log(`${updated} tasks updated with parentTaskID: ${parentId}`);
      }
    } catch (error) {
      throw new Error('Error updating child tasks: ' + error.message);
    }
  };

  const getTaskById = async (id) => {
    try {
      const tasks = await Task.findByPk(id,{
        include:[{model: Email}, {model: User}]
      });
      if (!tasks) {
        throw new Error('Task not found');
      }
      return tasks;
    } catch (error) {
      throw new Error('Error fetching Task: ' + error.message);
    }
  };

  const getTaskByGmailMessageId = async (gmailMessageId) => {
    try {
      // Query to find a task with the given gmailMessageId and isTaskCreated set to false
      return await Task.findOne({ gmailMessageId, isTaskCreated: false });
    } catch (error) {
      console.error('Error fetching task by gmailMessageId:', error);
      throw new Error('Error fetching Task: ' + error.message);
    }
  };

  // const getAllTask = async (page, limit) => {
  //   try {
  //     const offset = (page - 1) * limit;
  //     const { rows: tasks, count: total } = await Task.findAndCountAll({
  //       offset,
  //       limit: parseInt(limit, 10),
  //       where: { status: true } ,
  //       order: [['createdAt', 'DESC']],
  //     include:[{model:Email}]

  //     });
  
  //     return { tasks, total };
  //   } catch (error) {
  //     throw new Error('Error fetching tasks: ' + error.message);
  //   }
  // };

  const getAllTask = async (page, limit, deadline, userId, role) => {
    try {
      const offset = (page - 1) * limit;
      const whereClause = { status: true,
        parentTaskID: null
       }; 
      if (role === 'User') {
        whereClause.userId = userId; 
      }
  
      if (deadline) {
        whereClause.deadline = {
          [Sequelize.Op.lte]: new Date(deadline),
        };
      } else {
        console.log('Fetching all tasks without deadline filter');
      }
  
      const { rows: tasks, count: total } = await Task.findAndCountAll({
        offset,
        limit: parseInt(limit, 10),
        where: whereClause,
        order: [['createdAt', 'DESC']],
        include: [
          { model: Email },
          {
            model: BoardList,
            attributes: ['boardId', 'coloum', 'id'],
          },
          {
            model: Task,
            as: 'SubTasks',
            required: false, 
          }
        ],
      });

      return { tasks, total };
    } catch (error) {
      throw new Error('Error fetching tasks: ' + error.message);
    }
  };
  

  const deleteTaskById = async (id) => {
    try {
      const deletedTask = await Task.findByPk(id);
  
      if (!deletedTask) {
        throw new Error('Task not found');
      }
  
      await Task.update({ status: false }, {
        where: { id }
      });
  
      return deletedTask;
    } catch (error) {
      throw new Error('Error deleting Task: ' + error.message);
    }
  };

  const getTaskByThreadId = async (gmailMessageId) => {
    try {
      const task = await Task.findOne({ where: { gmailMessageId } });
      if (!task) {
        throw new Error('Task not found');
      }
      return task;
    } catch (error) {
      throw error;
    }
  };

 const getAllDeletedTask = async () => {
    try {
        const deletedTasks = await Task.findAll({
            where: {
                status: false 
            }
        });
        return deletedTasks;
    } catch (error) {
        console.error('Error retrieving deleted tasks from database:', error);
        throw new Error('Unable to fetch deleted tasks');
    }
};

const updateParentTask = async (taskId, updateData) => {
  
  const task = await Task.findByPk(taskId);

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  if (updateData.parentTaskID === '') {
    updateData.parentTaskID = null;
  }

  if (updateData.parentTaskID !== null) {
    const parentTask = await Task.findOne({ where: { id: updateData.parentTaskID } });

    if (!parentTask) {
      const error = new Error('Parent task not found');
      error.statusCode = 404; 
      throw error;
    }

    updateData.boardListId = parentTask.boardListId;
  }

  const [updatedRows] = await Task.update(
    updateData, 
    { where: { id: taskId } }
  );

  if (updatedRows === 0) {
    throw new Error('Update failed or no changes made');
  }
  const [childTasksUpdated] = await Task.update(
    updateData, 
    { where: { parentTaskID: taskId } }
  );

  if (childTasksUpdated === 0) {
    console.warn('No child tasks updated or no changes made');
  }

  
  const updatedTask = await Task.findByPk(taskId);
  return updatedTask;
};

module.exports = {
  createTask,
  updateTask,
  getTaskById,
  getAllTask,
  deleteTaskById,
  updateStatusTask,
  getTaskByThreadId,
  getAllDeletedTask,
  updateParentTask,
  updateChildTasks,
  getTaskByGmailMessageId
};
