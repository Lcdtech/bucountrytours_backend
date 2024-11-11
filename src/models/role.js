// models/Role.js
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      privileges: {
        type: DataTypes.JSON, // JSON type to store privileges
        allowNull: false,
      },
    }, {
      timestamps: true, // Ensure this is true if you want createdAt and updatedAt
    });
  
    return Role;
  };
  