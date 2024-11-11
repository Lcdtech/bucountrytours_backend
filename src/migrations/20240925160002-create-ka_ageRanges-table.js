const { Sequelize } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ka_ageRanges', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true,
              },
              title: {
                type: Sequelize.STRING,
                allowNull: true,
              },
              startAge: {
                  type: Sequelize.INTEGER,
                  allowNull: true,
              },
              endAge:{
                  type: Sequelize.INTEGER,
                  allowNull: true,
              },
            groupId: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'ka_ageRangeGroup',
                    key: 'id'
                  }
            },
            status: {
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
        await queryInterface.dropTable('ka_ageRanges');
    }
};
