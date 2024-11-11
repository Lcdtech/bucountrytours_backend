module.exports = (sequelize, DataTypes) => {
    const MappingBoardGmailUser = sequelize.define(
      'MappingBoardGmailUser',
      { id: {
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
      boardListId:{
        type: DataTypes.STRING,
        allowNull: true,
        // references: {
        //   model: 'boardList',
        //   key: 'id'
        // },
       },
      gmailUserId:{
        type: DataTypes.STRING,
        allowNull: true,
        // references: {
        //   model: 'gmailUser',
        //   key: 'id'
        // },
      },
      permissionId:{
        type: DataTypes.STRING,
        allowNull: true,
        // references: {
        //   model: 'permission',
        //   key: 'id'
        // },
       },
      labels: {
        type: DataTypes.STRING,
        allowNull:true,
        references: {
            model: 'email',
            key: 'labels'
        }
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
          }},
    {
      tableName: 'mappingBoardGmailUser',
      freezeTableName: true
      
    }
  );
  MappingBoardGmailUser.associate = (models) => {
    MappingBoardGmailUser.belongsTo(models.GmailUser, {
      foreignKey: 'gmailUserId',
      targetKey: 'id',
      // as: 'email' 
    });

    MappingBoardGmailUser.belongsTo(models.Permission, {
        foreignKey: 'permissionId',
        targetKey: 'id',
        // as: 'email' 
      });
      MappingBoardGmailUser.belongsTo(models.Email, {
        foreignKey: 'labels',
        targetKey: 'labels',
        // as: 'email' 
      });
      MappingBoardGmailUser.belongsTo(models.Board, {
        foreignKey: 'boardId',
        targetKey: 'id',
        // as: 'email' 
      });
      MappingBoardGmailUser.belongsTo(models.BoardList, {
        foreignKey: 'boardListId',
        targetKey: 'id',
        // as: 'email' 
      });
  
}
  return MappingBoardGmailUser;
};