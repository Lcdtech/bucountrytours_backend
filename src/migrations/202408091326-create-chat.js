const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contactId:{
        type: Sequelize.UUID,
        allowNull: true,
        // references: {
        //   model: 'contacts',
        //   key: 'id'
        // },
      },
      profileId:{
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'wtProfiles',
          key: 'id'
        },
      },
      messageSendBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      messageRecivedBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      lastSeen: {
        type: Sequelize.DATE,
        allowNull: true 
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      attachment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('chats');
  }
};
