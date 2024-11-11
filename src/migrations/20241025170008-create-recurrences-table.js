const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recurrences', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      index: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      rule: {
        type: Sequelize.JSON, 
        allowNull: true,
      },
      recurrenceType: {
        type: Sequelize.STRING, 
        allowNull: true,
        defaultValue: "OPEN",
      },
      maxCapacity: {
        type: Sequelize.INTEGER, 
        allowNull: true
      },
      maxCapacityForPickup: {
        type: Sequelize.INTEGER, 
        allowNull: true
      },
      minTotalPax: {
        type: Sequelize.INTEGER, 
        allowNull: true
      },
      startDate: {
        type: Sequelize.JSON, 
        allowNull: true,
      },
      endDate: {
        type: Sequelize.JSON, 
        allowNull: true,
      },
      color: {
        type: Sequelize.STRING, 
        allowNull: true
      },
      label: {
        type: Sequelize.STRING, 
        allowNull: true
      },
      affectedStartTimes: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: "[]"
      },
      guidedLanguages: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: "[]"
      },
      bom: {
        type: Sequelize.JSON, 
        allowNull: true,
      },
      guidedLangs: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: "[]"
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
    await queryInterface.dropTable('recurrences');
  }
};