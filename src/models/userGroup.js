// models/Role.js
module.exports = (sequelize, DataTypes) => {
    const UserGroup = sequelize.define('UserGroup', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: DataTypes.JSON, // JSON type to store privileges
        allowNull: false,
      },
      group: {
        type: DataTypes.JSON, // JSON type to store privileges
        allowNull: false,
      },
      
    },
    
  );
  
    return UserGroup;
  };
  