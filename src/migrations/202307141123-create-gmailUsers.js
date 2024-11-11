const { Sequelize } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('gmailUsers', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
              },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: true,
            },
            colour: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            fetchedAt: {
                type: Sequelize.DATE,
                allowNull: true,
              },
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('gmailUsers');
    }
};