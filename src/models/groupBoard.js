module.exports = (sequelize, DataTypes) => {
    const GroupBoard = sequelize.define(
      'GroupBoard',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true
      },
      boardId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'boards',
          key: 'id'
        },
      },
      groupUserId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'groupUsers',
          key: 'id'
        },
      },
      boardListId:{
        type: DataTypes.JSON,
        allowNull: true,
          defaultValue: "[]"
        // references: {
        //   model: 'boardLists',
        //   key: 'id'
        // },
       },
       permissions: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: "[]"
      },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
          },
        }, {
        tableName: 'groupBoards',
        freezeTableName: true
      }
      );
     
      GroupBoard.associate = (models) => {
        GroupBoard.belongsTo(models.Board, {
            foreignKey: 'boardId',
            targetKey: 'id',
            // as: 'emails'
        });
    //     GmailUser.hasMany(models.MappingBoardGmailUser, {
    //       foreignKey: 'gmailUserId',
    //       sourceKey: 'id',
    //       // as: 'emails'
    //   });
    };
    
      return GroupBoard;
    };