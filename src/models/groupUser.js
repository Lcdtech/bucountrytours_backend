module.exports = (sequelize, DataTypes) => {
    const GroupUser = sequelize.define(
      'GroupUser',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true
      },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        userId: {
          type: DataTypes.JSON,
          allowNull: true,
      },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
          },
        }, {
        tableName: 'groupUsers',
        freezeTableName: true
      }
      );
     
    //   GmailUser.associate = (models) => {
    //     GmailUser.hasMany(models.Email, {
    //         foreignKey: 'gmailUserId',
    //         sourceKey: 'id',
    //         // as: 'emails'
    //     });
    //     GmailUser.hasMany(models.MappingBoardGmailUser, {
    //       foreignKey: 'gmailUserId',
    //       sourceKey: 'id',
    //       // as: 'emails'
    //   });
    // };
    
      return GroupUser;
    };