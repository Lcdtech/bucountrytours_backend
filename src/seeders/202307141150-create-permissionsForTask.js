'use strict';
const { v4: uuidv4 } = require('uuid'); 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('permissions', [
      {
        id: uuidv4(), 
        name: 'View board',
        details: 'View full board.',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('permissionsForTask', null, {});
  }
};
