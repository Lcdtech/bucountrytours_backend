module.exports = (sequelize, DataTypes) => {
    const G_Token = sequelize.define(
      'G_Token',
      {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
          },
          type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'authorized_user'
          },
          client_id: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          client_secret: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          access_token: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          refresh_token: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          token_type: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          messageId: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          token_status: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          status:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
          },
          expireDate: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
      },
      {
        tableName: 'g_tokens',
        freezeTableName: true
       
      }
    );
    return G_Token;
  };
  