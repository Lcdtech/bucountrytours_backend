module.exports = (sequelize, DataTypes) => {
    const Ka_categoriesGroup = sequelize.define(
      'Ka_categoriesGroup',
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
        tableName: 'ka_categoriesGroup',
        freezeTableName: true
  
      }
    );
    Ka_categoriesGroup.associate = (models) => {
      Ka_categoriesGroup.hasMany(models.Ka_categorie, {
        foreignKey: 'groupId',
        sourceKey: 'id',
        // as: 'task' 
      });
  
  }
        return Ka_categoriesGroup;
  };