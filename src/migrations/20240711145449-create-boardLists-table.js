const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('boardLists', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      coloum: {
        type: Sequelize.STRING
      },
      boardId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'boards',
          key: 'id'
        },
      },
      colour: {
        type: Sequelize.STRING,
        allowNull: true,
    },
      sequence: {
       type: Sequelize.INTEGER,
       allowNull: true
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
    await queryInterface.dropTable('boardLists');
  }
};
