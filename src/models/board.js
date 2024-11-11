module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define(
      'Board',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        boardName: {
            type: DataTypes.STRING
          },
          status:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
          }
      },
      {
        tableName: 'boards',
       
      }
    );
    Board.associate = (models) => {
      Board.hasMany(models.BoardList, {
          foreignKey: 'boardId',
          sourceKey: 'id',
      });
      Board.hasMany(models.MappingBoardGmailUser, {
        foreignKey: 'boardId',
        sourceKey: 'id',
    });
    Board.hasMany(models.UserBoard, {
      foreignKey: 'boardId',
      sourceKey: 'id',
  });
  Board.hasMany(models.GroupBoard, {
    foreignKey: 'boardId',
    sourceKey: 'id',
});
    }
    return Board;
  };
  