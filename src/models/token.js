module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('Token', {
      token: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      user: {
        type: DataTypes.UUID,
        allowNull: true
      },
      type: {
        type: DataTypes.STRING
      },
      expires: {
        type: DataTypes.DATE
      },
      blacklisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      tableName: 'tokens',
      freezeTableName: true
    });
    return Token;
  };