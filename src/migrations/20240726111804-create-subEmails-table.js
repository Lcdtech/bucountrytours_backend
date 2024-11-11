'use strict';

const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subEmails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      threadId: {
        type: Sequelize.STRING,
        references: {
          model: 'emails', 
          key: 'gmailMessageId' 
        }
      },
      subThreadId:{
        type: Sequelize.STRING,
      },
      sender:{
        type: Sequelize.STRING,
      },
      gmailStatus: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'TO DO',
      },
      receiver:{
        type: Sequelize.JSON,
      },
      subject: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.TEXT,
      },
      name: {
        type: Sequelize.STRING
      },
      attachmentPaths: {
        type: Sequelize.JSON,
      },
      status:{
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
      fetchedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('subEmails');
  }
};
