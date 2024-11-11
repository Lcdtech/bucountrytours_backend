const { Sequelize } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('bookings', {
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
            productTitle: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            productDate: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            productTime: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            total: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            pickupPlace: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            dropOffPlace: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            currency: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            paymentMethod: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            bookingRef: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            firstName: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            lastName: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            email: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            phoneNo: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            country: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            organization: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            noteForBooking: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            noteForFinance: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            noteForOperations: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            emailTicketSend: {
              type: Sequelize.BOOLEAN,
              allowNull: true,
              defaultValue: false,
            },
            markAsArrived: {
              type: Sequelize.BOOLEAN,
              allowNull: true,
              defaultValue: false,
            },
            ticket: {
                type: Sequelize.JSON,
                allowNull: true,
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
        await queryInterface.dropTable('bookings');
    }
};
