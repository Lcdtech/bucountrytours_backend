module.exports = (sequelize, DataTypes) => {
    const Ka_themesGroup = sequelize.define(
      'Ka_themesGroup',
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
        tableName: 'ka_themesGroup',
        freezeTableName: true,
        //underscored: true,
  
      }
    );

    Ka_themesGroup.associate = (models) => {
      Ka_themesGroup.hasMany(models.Ka_theme, {
        foreignKey: 'groupId',
        sourceKey: 'id',
        // as: 'task' 
      });
  
  }
        return Ka_themesGroup;
  };