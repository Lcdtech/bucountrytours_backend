module.exports = (sequelize, DataTypes) => {
    const Ka_categorie = sequelize.define(
      'Ka_categorie',
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
        tableName: 'ka_categories',
        freezeTableName: true
  
      }
    );
    Ka_categorie.associate = (models) => {
      Ka_categorie.belongsTo(models.Ka_categoriesGroup, {
        foreignKey: 'groupId',
        targetKey: 'id',
        // as: 'email' 
      });
  
    }
        return Ka_categorie;
  };