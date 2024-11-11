module.exports = (sequelize, DataTypes) => {
    const Email = sequelize.define(
      'Email',
      {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  gmailMessageId: {
    type: DataTypes.STRING,
    unique: true, 
  },
  sentTo:{
    type: DataTypes.JSON,
  },
  sentBy:{
    type: DataTypes.STRING,
  },
  subject: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.TEXT,
  },
  name: {
    type: DataTypes.STRING
  },
  attachmentPaths: {
    type: DataTypes.JSON,
  },
  messageRead: {
    type: DataTypes.STRING,
    defaultValue: "unread"
  },
  isTaskCreated:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  gmailUserId:{
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'GmailUser',
      key: 'id'
    },
  },
  boardId:{
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Board',
      key: 'id'
    },
  },
  contactId:{
    type: DataTypes.JSON,
    allowNull: true,
    // references: {
    //   model: 'Contact',
    //   key: 'id'
    // },
  },
  labels: {
    type: DataTypes.STRING,
    allowNull:true
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },
  fetchedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  createdAtEmail: {
    allowNull: true,
    type: DataTypes.DATE
  },
  updatedAtEmail: {
    allowNull: true,
    type: DataTypes.DATE
  },
}, {
    tableName: 'emails',
    freezeTableName: true
  }
);
Email.associate = (models) => {
  Email.hasMany(models.Task, {
    foreignKey: 'gmailMessageId',
    sourceKey: 'gmailMessageId',
    // as: 'task' 
  });
  Email.hasMany(models.SubEmail, {
    foreignKey: 'threadId',
    sourceKey: 'gmailMessageId',
    // foreignKey: 'gmailMessageId',
    // as: 'subEmail' 
  });
  Email.belongsTo(models.GmailUser, {
    foreignKey: 'gmailUserId',
    targetKey:'id'
    // as: 'gmailUser'
});
// Email.belongsTo(models.Chat, {
//   foreignKey: 'contactId',
//   targetKey: 'contactId',
//   // as: 'email' 
// });
Email.hasMany(models.MappingBoardGmailUser, {
  foreignKey: 'labels',
  sourceKey: 'labels',
  // as: 'task' 
});
};
return Email;
};

