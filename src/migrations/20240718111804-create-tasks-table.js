'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      gmailMessageId: {
        type: Sequelize.STRING,
        // unique: true,
        allowNull: true,
        references: {
          model: 'emails',
          key: 'gmailMessageId'
        }
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      parentTaskID: {
        type: Sequelize.UUID,
        allowNull: true
      },
      parentTaskStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // taskStatus: {
      //   type: Sequelize.STRING,
      //   default:"TO DO"
      // },
      projectBoard: {
        type: Sequelize.ENUM('Ideas', 'Planned', 'In progress', 'Done'),
        allowNull: true
      },
      reminder: {
        type: Sequelize.ENUM('Later today', 'Tomorrow', 'In two days', 'Next week', 'Pick a date', 'Add this item to My Day plan', 'Also update the deadline date'),
        allowNull: true
      },
      myDayPlan: {
        type: Sequelize.ENUM('Today', 'Tomorrow', 'In two days', 'Next week', 'Pick a date', 'Also update the deadline date'),
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      nextStep: {
        type: Sequelize.ENUM('Later today', 'Tomorrow', 'In two days', 'Next week', 'Pick a date', 'Add this item to My Day plan', 'Also update the deadline date'),
        allowNull: true
      },
      kickOff: {
        type: Sequelize.ENUM('Later today', 'Tomorrow', 'In two days', 'Next week', 'Pick a date'),
        allowNull: true
      },
      priority: {
        type: Sequelize.ENUM('Low', 'Medium', 'High', 'Urgent'),
        allowNull: true
      },
      taskStatus1: {
        type: Sequelize.ENUM('On Track', 'Working on', 'Waiting', 'Stuck'),
        allowNull: true
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true
      },
      attachment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      deadline: {
        allowNull: true,
        type: Sequelize.DATE
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      boardListId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'boardLists',
          key: 'id'
        },
      },
      boardId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'boards',
          key: 'id'
        },
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('tasks');
  }
};
