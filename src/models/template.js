module.exports = (sequelize, DataTypes) => {
  const Template = sequelize.define(
    'Template',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      sentTo: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      sentBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      body: {
        type: DataTypes.TEXT,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      attachmentPaths: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      }
    },
    {
      tableName: 'templates',

    }
  );
  // Board.associate = (models) => {
  //   Board.hasMany(models.BoardList, {
  //       foreignKey: 'boardId',
  //       sourceKey: 'id',
  //       // as: 'emails'
  //   });
  // }
  return Template;
};
