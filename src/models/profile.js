module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define(
      'Profile',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      qr: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      whatsappConnected: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      clientId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        default:true
      },
      fetchedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      tableName: 'wtProfiles',
      freezeTableName: true
      
    },);

Profile.associate = (models) => {
  Profile.hasMany(models.Contact, {
    foreignKey: 'profileId',
    sourceKey: 'id',
  });
}
  return Profile;
};