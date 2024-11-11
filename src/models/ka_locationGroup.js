module.exports = (sequelize, DataTypes) => {
    const Ka_locationGroup = sequelize.define(
      'Ka_locationGroup',
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
        tableName: 'ka_locationGroups',
        freezeTableName: true
  
      }
    );
    Ka_locationGroup.associate = (models) => {
      Ka_locationGroup.hasMany(models.Ka_location, {
        foreignKey: 'groupId',
        sourceKey: 'id',
        // as: 'task' 
      });
  
  }
        return Ka_locationGroup;
  };