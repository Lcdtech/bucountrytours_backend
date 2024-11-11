const { Sequelize } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('usergroups', {
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
                type: Sequelize.STRING,
                allowNull: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            images: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            group: {
                type: Sequelize.JSON,
                allowNull: true,
            }
            
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('usergroups');
    }
};
