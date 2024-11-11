const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contacts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      contactNo: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true 
      },
      lastSeen: {
        type: Sequelize.DATE,
        allowNull: true 
      },
      profileId:{
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'wtProfiles',
          key: 'id'
        },
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      fetchedAt: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.dropTable('contacts');
  }
};
