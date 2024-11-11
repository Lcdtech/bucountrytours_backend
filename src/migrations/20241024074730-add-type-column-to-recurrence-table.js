'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('recurrences', 'type', {
      type: Sequelize.STRING, // Ensure this matches the model definition
      allowNull: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('recurrences', 'type');
  },
};
