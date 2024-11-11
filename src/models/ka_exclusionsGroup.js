module.exports = (sequelize, DataTypes) => {
    const Ka_exclusionsGroup = sequelize.define(
      'Ka_exclusionsGroup',
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
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true,
        }
      },
      {
        tableName: 'ka_exclusionsGroup',
        freezeTableName: true
  
      }
    );
    Ka_exclusionsGroup.associate = (models) => {
      Ka_exclusionsGroup.hasMany(models.Ka_exclusion, {
        foreignKey: 'groupId',
        sourceKey: 'id',
        // as: 'task' 
      });
  
  }
        return Ka_exclusionsGroup;
  };