module.exports = (sequelize, DataTypes) => {
    const Ka_cancellationPolicie = sequelize.define(
      'Ka_cancellationPolicie',
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
        groupId:{
            type: DataTypes.UUID,
            allowNull: true,
        },
        rules:{
         type: DataTypes.JSON,
         allowNull: true,
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true,
        }
      },
      {
        tableName: 'ka_cancellationPolicies',
        freezeTableName: true
  
      }
    );
    Ka_cancellationPolicie.associate = (models) => {
      Ka_cancellationPolicie.belongsTo(models.Ka_cancellationPolicieGroup, {
        foreignKey: 'groupId',
        targetKey: 'id',
        // as: 'email' 
      });
  
    }
        return Ka_cancellationPolicie;
  };