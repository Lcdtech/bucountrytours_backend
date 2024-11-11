const randomColor = require('randomcolor');

module.exports = (sequelize, DataTypes) => {
  const BoardList = sequelize.define(
    'BoardList',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      colour: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: () => randomColor(),  
      },
      boardId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Board',
          key: 'id'
        },
      },
      coloum: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sequence: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      }
    },
    {
      tableName: 'boardLists',

    }
  );
  BoardList.associate = (models) => {
    BoardList.hasMany(models.Task, {
      foreignKey: 'boardListId',
      sourceKey: 'id',
      // as: 'emails'
    });
    BoardList.belongsTo(models.Board, {
      foreignKey: 'boardId',
      targetKey: 'id',
      // as: 'emails'
    });
    BoardList.hasMany(models.MappingBoardGmailUser, {
      foreignKey: 'boardListId',
      sourceKey: 'id',
      // as: 'emails'
  });
  }
  return BoardList;
};
