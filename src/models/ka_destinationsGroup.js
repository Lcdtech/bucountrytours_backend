module.exports = (sequelize, DataTypes) => {
    const Ka_destinationsGroup = sequelize.define(
      'Ka_destinationsGroup',
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
        tableName: 'ka_destinationsGroup',
        freezeTableName: true
  
      }
    );
    Ka_destinationsGroup.associate = (models) => {
      Ka_destinationsGroup.hasMany(models.Ka_destination, {
        foreignKey: 'groupId',
        sourceKey: 'id',
        // as: 'task' 
      });
  
  }
        return Ka_destinationsGroup;
  };