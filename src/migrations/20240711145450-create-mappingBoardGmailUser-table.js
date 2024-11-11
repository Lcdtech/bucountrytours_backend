const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mappingBoardGmailUser', {
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
      boardListId:{
        type: Sequelize.STRING,
        allowNull: true,
        // references: {
        //   model: 'boardLists',
        //   key: 'id'
        // },
       },
      gmailUserId:{
        type: Sequelize.STRING,
        allowNull: true,
        // references: {
        //   model: 'gmailUsers',
        //   key: 'id'
        // },
      },
      permissionId:{
        type: Sequelize.STRING,
        allowNull: true,
        // references: {
        //   model: 'permissions',
        //   key: 'id'
        // },
       },
      labels: {
        type: Sequelize.STRING,
        allowNull:true,
        // references: {
        //     model: 'emails',
        //     key: 'labels'
        // }
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
    await queryInterface.dropTable('mappingBoardGmailUser');
  }
};
