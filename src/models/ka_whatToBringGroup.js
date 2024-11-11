module.exports = (sequelize, DataTypes) => {
    const Ka_whatToBringGroup = sequelize.define(
      'Ka_whatToBringGroup',
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
        tableName: 'ka_whatToBringGroups',
        freezeTableName: true
  
      }
    );
    Ka_whatToBringGroup.associate = (models) => {
      Ka_whatToBringGroup.hasMany(models.Ka_whatToBring, {
        foreignKey: 'groupId',
        sourceKey: 'id',
        // as: 'task' 
      });
  
  }
        return Ka_whatToBringGroup;
  };