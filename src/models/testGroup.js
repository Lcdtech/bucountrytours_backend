module.exports = (sequelize, DataTypes) => {
    const TestGroup = sequelize.define(
      'TestGroup',
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
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true,
        }
      },
      {
        tableName: 'testGroups',
        freezeTableName: true,
  
      }
    );
   
        return TestGroup;
  };