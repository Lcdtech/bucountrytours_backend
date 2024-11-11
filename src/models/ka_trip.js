const { language } = require("googleapis/build/src/apis/language");

module.exports = (sequelize, DataTypes) => {
  const Ka_trip = sequelize.define(
    'Ka_trip',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      clientBudget: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      columns: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      participants: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      prospects: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      verificationCode: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      locationGroup: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      }
    },
    {
      tableName: 'ka_trips',
      freezeTableName: true,
    }
  );
  return Ka_trip;
};