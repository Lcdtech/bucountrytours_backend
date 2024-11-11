module.exports = (sequelize, DataTypes) => {
    const Ka_location = sequelize.define(
      'Ka_location',
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
        coordinates:{
          type: DataTypes.JSON,
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
        tableName: 'ka_locations',
        freezeTableName: true
  
      }
    );
    Ka_location.associate = (models) => {
      Ka_location.belongsTo(models.Ka_locationGroup, {
        foreignKey: 'groupId',
        targetKey: 'id',
        // as: 'email' 
      });
  
    }
        return Ka_location;
  };