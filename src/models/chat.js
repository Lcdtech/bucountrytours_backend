module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define(
      'Chat',
      {
          messageSendBy: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          messageRecivedBy: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          message: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          contactId:{
            type: DataTypes.UUID,
            allowNull: true,
            references: {
              model: 'contacts',
              key: 'id'
            },
          },
          lastSeen: {
            type: DataTypes.DATE,
            allowNull: true 
          },
          status: {
            type: DataTypes.BOOLEAN,
            allowNull: true
          },
          attachment: {
            type: DataTypes.STRING,
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
      tableName: 'chats',
      freezeTableName: true
      
    }
  );
  Chat.associate = (models) => {
    Chat.belongsTo(models.Contact, {
      foreignKey: 'contactId',
      targetKey: 'id',
      // as: 'email' 
    });

    // Chat.hasMany(models.Email, {
    //   foreignKey: 'contactId',
    //   sourceKey: 'contactId',
    //   // as: 'email' 
    // });
}
  return Chat;
};