const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('wtProfiles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      contact: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      profile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      qr: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      clientId: {
        type: Sequelize.STRING
      },
      whatsappConnected: {
        type: Sequelize.ENUM('Connected', 'Disconnected','Pending'),
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      fetchedAt: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.dropTable('wtProfiles');
  }
};
