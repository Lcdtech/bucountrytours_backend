module.exports = (sequelize, DataTypes) => {
    const G_Credential = sequelize.define(
      'G_Credential',
      {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
          },
          client_id: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          project_id: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          auth_uri: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          token_uri: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          auth_provider_x509_cert_url: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          client_secret: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          redirect_uris: {
            type: DataTypes.JSON, // To store an array of redirect URIs
            allowNull: false,
          },
          messageId: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          status:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
          }
      },
      {
        tableName: 'g_credentials',
        freezeTableName: true
       
      }
    );
    return G_Credential;
  };
  