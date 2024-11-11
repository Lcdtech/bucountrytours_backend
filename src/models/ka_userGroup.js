module.exports = (sequelize, DataTypes) => {
    const Ka_userGroup = sequelize.define(
      'Ka_userGroup',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true,
        }
      },
      {
        tableName: 'ka_userGroups',
        freezeTableName: true
  
      }
    );
    
        return Ka_userGroup;
  };