module.exports = (sequelize, DataTypes) => {
    const Test = sequelize.define(
      'Test',
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
        title: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        groupId: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true,
        }
      },
      {
        tableName: 'tests',
        freezeTableName: true,
        //underscored: true,
  
      }
    );
   
        return Test;
  };