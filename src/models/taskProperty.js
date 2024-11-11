module.exports = (sequelize, DataTypes) => {
    const taskProperty = sequelize.define(
      'taskProperty',
      {
        type: {
            type: DataTypes.STRING
          },
          propertyName: {
            type: DataTypes.STRING
          },
          status:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
          }
      },
      {
        tableName: 'taskProperties',
        freezeTableName: true
       
      }
    );
    return taskProperty;
  };
  