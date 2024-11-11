// models/task.js

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
      gmailMessageId: {
        type: DataTypes.STRING,
        // unique: true,
        allowNull: true,
        references: {
          model: 'Email',
          key: 'gmailMessageId'
        }
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id'
        },
      },
      parentTaskID: {
        type: DataTypes.UUID,
        allowNull: true
      },
      parentTaskStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      projectBoard: {
        type: DataTypes.ENUM('Ideas', 'Planned', 'In progress', 'Done'),
        allowNull: true
      },
      reminder: {
        type: DataTypes.ENUM('Later today', 'Tomorrow', 'In two days', 'Next week', 'Pick a date', 'Add this item to My Day plan', 'Also update the deadline date'),
        allowNull: true
      },
      myDayPlan: {
        type: DataTypes.ENUM('Today', 'Tomorrow', 'In two days', 'Next week', 'Pick a date', 'Also update the deadline date'),
        allowNull: true
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      nextStep: {
        type: DataTypes.ENUM('Later today', 'Tomorrow', 'In two days', 'Next week', 'Pick a date', 'Add this item to My Day plan', 'Also update the deadline date'),
        allowNull: true
      },
      kickOff: {
        type: DataTypes.ENUM('Later today', 'Tomorrow', 'In two days', 'Next week', 'Pick a date'),
        allowNull: true
      },
      priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High', 'Urgent'),
        allowNull: true
      },
      taskStatus1: {
        type: DataTypes.ENUM('On Track', 'Working on', 'Waiting', 'Stuck'),
        allowNull: true
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true
      },
      attachment: {
        type: DataTypes.STRING,
        allowNull: true
      },
      deadline: {
        allowNull: true,
        type: DataTypes.DATE
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      boardListId:{
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'BoardList',
          key: 'id'
        },
       },
       boardId:{
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Board',
          key: 'id'
        },
       },
    }, {
      tableName: 'tasks', 
      freezeTableName: true, 
    });

    Task.associate = (models) => {
        Task.belongsTo(models.Email, {
          foreignKey: 'gmailMessageId',
          targetKey: 'gmailMessageId',
          // as: 'email' 
        });
        Task.belongsTo(models.User, {
          foreignKey: 'userId',
          targetKey: 'id',
          // as: 'email' 
        });
        Task.belongsTo(models.Board, {
          foreignKey: 'boardId',
          targetKey: 'id',
          // as: 'email' 
        });
        Task.belongsTo(models.BoardList, {
          foreignKey: 'boardListId',
          targetKey: 'id',
          // as: 'email' 
        });
        Task.belongsTo(models.Task, {
          foreignKey: 'parentTaskID',
          targetKey: 'id',
          as: 'ParentTask', // Alias for the parent task
        });
        Task.hasMany(models.Task, {
          foreignKey: 'parentTaskID',
          sourceKey: 'id',
          as: 'SubTasks', // Alias for child tasks
        });
      };
  
    return Task;
  };
  