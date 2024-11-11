'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('products', 'recurrences', {
          type: Sequelize.JSON,
          allowNull: true,
          defaultValue: []
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('products', 'recurrences');
  }
};
