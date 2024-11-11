const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userBoard', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      boardId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'boards',
          key: 'id'
        },
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      boardListId:{
        type: Sequelize.JSON,
        allowNull: true,
          defaultValue: "[]"
        // references: {
        //   model: 'boardLists',
        //   key: 'id'
        // },
       },
       permissions: {
        type: Sequelize.JSON, 
        allowNull: true,
        defaultValue: "[]"
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
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('userBoard');
  }
};
