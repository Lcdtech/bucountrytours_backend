const { Sequelize } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('accommodation', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            productId: {
                type: Sequelize.UUID,
                allowNull: true,
            },
            code: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            productStatus: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            images: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            destinations: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            types: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            themes: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            categories: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            videoLink: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            times: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            pickupPlaces: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            dropoffPlaces: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            locations: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            languagesTour: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            room: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            languages: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            cancellationPolicies: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            whatToBring: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            tasks: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            ageRanges: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            exclusions: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            inclusions: {
                type: Sequelize.JSON,
                allowNull: true,
            },
             resources: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            rates: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            accommodation: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: true,
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('accommodation');
    }
};
