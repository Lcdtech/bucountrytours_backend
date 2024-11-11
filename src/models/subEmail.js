module.exports = (sequelize, DataTypes) => {
    const SubEmail = sequelize.define(
      'SubEmail',
      {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  threadId: {
    type: DataTypes.STRING,
    references: {
      model: 'Email', 
      key: 'gmailMessageId' 
    }
  },
  subThreadId:{
    type: DataTypes.STRING,
  },
  sender:{
    type: DataTypes.STRING,
  },
  gmailStatus: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'TO DO',
  },
  receiver:{
    type: DataTypes.JSON,
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
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },
  fetchedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },

}, {
    tableName: 'subEmails',
    freezeTableName: true
  }
);
SubEmail.associate = (models) => {
    SubEmail.belongsTo(models.Email, {
      foreignKey: 'threadId', 
      targetKey: 'gmailMessageId',
      // as: 'email' 
    });
  };

return SubEmail;
};

