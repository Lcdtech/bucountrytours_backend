const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('availabilities', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      date: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: "[]"
      },
      startTime: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      dateAndTime: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      time: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      recurrenceRuleIds: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pickupTotal: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:0
      },
      minimum: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:0
      },
      booked: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:0
      },
      pickupBooked: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:0
      },
      available: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:0
      },
      pickupAvailable: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:0
      },
      pickupAllotment: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },
      freeSale: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },
      closed: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },
      unavailable: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },
      guidedLanguages: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue:""
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
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
    await queryInterface.dropTable('availabilities');
  }
};