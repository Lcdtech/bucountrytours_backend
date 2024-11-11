module.exports = (sequelize, DataTypes) => {
  const Rule = sequelize.define(
    'Rule',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
      },
      when: {
        type: DataTypes.JSON
      },
      condition: {
        type: DataTypes.JSON
      },
      action: {
        type: DataTypes.JSON
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      }
    },
    {
      tableName: 'rules',
      freezeTableName: true
    }
  );
  return Rule;
};
