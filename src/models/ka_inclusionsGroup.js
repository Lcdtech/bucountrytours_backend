module.exports = (sequelize, DataTypes) => {
    const Ka_inclusionsGroup = sequelize.define(
      'Ka_inclusionsGroup',
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
        tableName: 'ka_inclusionsGroup',
        freezeTableName: true
  
      }
    );
    Ka_inclusionsGroup.associate = (models) => {
      Ka_inclusionsGroup.hasMany(models.Ka_inclusion, {
        foreignKey: 'groupId',
        sourceKey: 'id',
        // as: 'task' 
      });
  
  }
        return Ka_inclusionsGroup;
  };