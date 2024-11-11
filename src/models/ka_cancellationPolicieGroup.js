module.exports = (sequelize, DataTypes) => {
    const Ka_cancellationPolicieGroup = sequelize.define(
      'Ka_cancellationPolicieGroup',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true
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
        tableName: 'Ka_cancellationPolicieGroup',
        freezeTableName: true
  
      }
    );
    Ka_cancellationPolicieGroup.associate = (models) => {
      Ka_cancellationPolicieGroup.hasMany(models.Ka_cancellationPolicie, {
        foreignKey: 'groupId',
        sourceKey: 'id',
        // as: 'task' 
      });
  
  }
        return Ka_cancellationPolicieGroup;
  };