module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'User',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true
      },
      // permissions: {
      //   type: DataTypes.JSON, 
      //   allowNull: true,
      //   defaultValue: []
      // },
    },
    {
      tableName: 'user',
      freezeTableName: true,
      defaultScope: {
        attributes: { exclude: ['password'] }
      },
      scopes: {
        withSecretColumns: {
          attributes: { include: ['password'] }
        }
      }
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Task, {
      foreignKey: 'userId',
      sourceKey: 'id',

    });

    User.hasMany(models.UserBoard, {
      foreignKey: 'userId',
      sourceKey: 'id',

    });
  };
  return User;
};
