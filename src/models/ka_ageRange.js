module.exports = (sequelize, DataTypes) => {
    const Ka_ageRange = sequelize.define(
      'Ka_ageRange',
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
        startAge: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        endAge:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        groupId: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true,
        }
      },
      {
        tableName: 'ka_ageRanges',
        freezeTableName: true
  
      }
    );
    Ka_ageRange.associate = (models) => {
      Ka_ageRange.belongsTo(models.Ka_ageRangeGroup, {
        foreignKey: 'groupId',
        targetKey: 'id',
        // as: 'email' 
      });
  
    }
        return Ka_ageRange;
  };