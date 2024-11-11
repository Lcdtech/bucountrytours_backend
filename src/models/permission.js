module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    'Permission',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING
      },
      details: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }, {
    tableName: 'permissions',
    freezeTableName: true
  }
  );
  Permission.associate = (models) => {
    Permission.hasMany(models.MappingBoardGmailUser, {
      foreignKey: 'permissionId',
      sourceKey: 'id',
      // as: 'task' 
    });

  };
  return Permission;
};
