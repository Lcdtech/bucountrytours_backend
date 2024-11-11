module.exports = (sequelize, DataTypes) => {
    const Ka_whatToBring = sequelize.define(
      'Ka_whatToBring',
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
        tableName: 'ka_whatToBrings',
        freezeTableName: true
  
      }
    );
    Ka_whatToBring.associate = (models) => {
      Ka_whatToBring.belongsTo(models.Ka_whatToBringGroup, {
        foreignKey: 'groupId',
        targetKey: 'id',
        // as: 'email' 
      });
  
    }
        return Ka_whatToBring;
  };