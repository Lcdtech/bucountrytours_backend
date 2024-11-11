module.exports = (sequelize, DataTypes) => {
    const UserBoard = sequelize.define(
        'UserBoard',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            boardId: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                  model: 'boards',
                  key: 'id'
                },
              },
              userId: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                  model: 'user',
                  key: 'id'
                },
              },
              boardListId:{
                type: DataTypes.JSON,
                allowNull: true,
                  defaultValue: "[]"
               },
               permissions: {
                type: DataTypes.JSON, 
                allowNull: true,
                defaultValue: "[]"
              },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {
            tableName: 'userBoard',
            freezeTableName: true

        }
    );
      UserBoard.associate = (models) => {
        UserBoard.belongsTo(models.User, {
          foreignKey: 'userId',
          targetKey: 'id',
          // as: 'email' 
        });
        UserBoard.belongsTo(models.Board, {
          foreignKey: 'boardId',
          targetKey: 'id',
          // as: 'email' 
        });
    }
    return UserBoard;
};