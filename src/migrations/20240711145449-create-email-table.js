'use strict';

const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('emails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gmailMessageId: {
        type: Sequelize.STRING,
        unique: true, 
      },
      sentTo:{
        type: Sequelize.JSON,
      },
      sentBy:{
        type: Sequelize.STRING,
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
      labels: {
        type: Sequelize.STRING,
        allowNull:true
      },
      messageRead: {
        type: Sequelize.STRING,
        defaultValue: "unread"
      },
      status:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      gmailUserId:{
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'gmailUsers',
          key: 'id'
        },
      },
      boardId:{
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'boards',
          key: 'id'
        },
      },
      contactId:{
        type: Sequelize.JSON,
        allowNull: true,
        // references: {
        //   model: 'contacts',
        //   key: 'id'
        // },
      },
      isTaskCreated:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      createdAtEmail: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAtEmail: {
        allowNull: true,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('emails');
  }
};
