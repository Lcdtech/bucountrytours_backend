module.exports = (sequelize, DataTypes) => {
  const Ka_theme = sequelize.define(
    'Ka_theme',
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
        references: {
          model: 'Ka_themesGroup',
          key: 'id'
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      }
    },
    {
      tableName: 'ka_themes',
      freezeTableName: true,
      //underscored: true,

    }
  );
  Ka_theme.associate = (models) => {
    Ka_theme.belongsTo(models.Ka_themesGroup, {
      foreignKey: 'groupId',
      targetKey: 'id',
      // as: 'email' 
    });

  }
  return Ka_theme;
};