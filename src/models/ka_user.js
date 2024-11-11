module.exports = (sequelize, DataTypes) => {
    const Ka_user = sequelize.define(
      'Ka_user',
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
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        password:{
              type: DataTypes.STRING,
              allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'User',
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true,
        }
      },
      {
        tableName: 'ka_users',
        freezeTableName: true
  
      }
    );
    
        return Ka_user;
  };