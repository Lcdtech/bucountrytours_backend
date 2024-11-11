module.exports = (sequelize, DataTypes) => {
    const Ka_ageRangeGroup = sequelize.define(
      'Ka_ageRangeGroup',
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
        tableName: 'ka_ageRangeGroup',
        freezeTableName: true
  
      }
    );
    Ka_ageRangeGroup.associate = (models) => {
      Ka_ageRangeGroup.hasMany(models.Ka_ageRange, {
        foreignKey: 'groupId',
        sourceKey: 'id',
        // as: 'task' 
      });
  
  }
        return Ka_ageRangeGroup;
  };