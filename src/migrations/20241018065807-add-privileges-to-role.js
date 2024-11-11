'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Roles', 'privileges', {
      type: Sequelize.JSON, // Ensure this matches the model definition
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Roles', 'privileges');
  },
};
