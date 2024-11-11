module.exports = (sequelize, DataTypes) => {
    const Ka_exclusion = sequelize.define(
      'Ka_exclusion',
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
        tableName: 'ka_exclusions',
        freezeTableName: true
  
      }
    );
    Ka_exclusion.associate = (models) => {
      Ka_exclusion.belongsTo(models.Ka_exclusionsGroup, {
        foreignKey: 'groupId',
        targetKey: 'id',
        // as: 'email' 
      });
  
    }
        return Ka_exclusion;
  };