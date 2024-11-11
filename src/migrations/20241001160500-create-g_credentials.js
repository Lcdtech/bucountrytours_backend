const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('g_credentials', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      client_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      project_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      auth_uri: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      token_uri: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      auth_provider_x509_cert_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      client_secret: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      redirect_uris: {
        type: Sequelize.JSON, // To store an array of redirect URIs
        allowNull: false,
      },
      messageId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('g_credentials');
  }
};
