module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'Contact',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      contactNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      profileId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Profile',
          key: 'id'
        },
      },
      lastSeen: {
        type: DataTypes.DATE,
        allowNull: true
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true
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
      tableName: 'contacts',
      freezeTableName: true

    }
  );

  Contact.associate = (models) => {
    Contact.belongsTo(models.Profile, {
      foreignKey: 'profileId',
      targetKey: "id"
      // as: 'task' 
    });
    Contact.hasMany(models.Chat, {
      foreignKey: 'contactId',
      targetKey: "id"
      // as: 'task' 
    });
  }
  return Contact;
};