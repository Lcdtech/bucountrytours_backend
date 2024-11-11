const { Sequelize } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ka_trips', {
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
            clientBudget: {
                 type: Sequelize.INTEGER,
                 allowNull: true,
            },
            columns:{
                type: Sequelize.JSON,
                allowNull: true,
            },
            language:{
               type: Sequelize.STRING,
               allowNull: true,
            },
            startDate: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            endDate: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            participants: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            price: {
                type: Sequelize.DOUBLE,
                allowNull: true,  
            },
            prospects: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            verificationCode: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            locationGroup:{
                type: Sequelize.JSON,
                allowNull: true,
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
        await queryInterface.dropTable('ka_trips');
    }
};
