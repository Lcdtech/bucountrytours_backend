module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('tokens', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        token: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        user: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING
        },
        expires: {
          type: Sequelize.DATE
        },
        blacklisted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
    down: (queryInterface) => queryInterface.dropTable('tokens')
  };