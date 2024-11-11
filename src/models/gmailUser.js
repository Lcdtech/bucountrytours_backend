module.exports = (sequelize, DataTypes) => {
  const GmailUser = sequelize.define(
    'GmailUser',
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
      email: {
        type: DataTypes.STRING
      },
      colour: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      fetchedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    }, {
    tableName: 'gmailUsers',
    freezeTableName: true
  }
  );
  // Email.associate = (models) => {
  //   Email.hasMany(models.Task, {
  //     foreignKey: 'gmailMessageId',
  //     // as: 'task' 
  //   });
  //   Email.hasMany(models.SubEmail, {
  //     foreignKey: 'threadId',
  //     // foreignKey: 'gmailMessageId',
  //     // as: 'subEmail' 
  //   });
  // };
  GmailUser.associate = (models) => {
    GmailUser.hasMany(models.Email, {
        foreignKey: 'gmailUserId',
        sourceKey: 'id',
        // as: 'emails'
    });
    GmailUser.hasMany(models.MappingBoardGmailUser, {
      foreignKey: 'gmailUserId',
      sourceKey: 'id',
      // as: 'emails'
  });
};

  return GmailUser;
};