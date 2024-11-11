module.exports = (sequelize, DataTypes) => {
    const TaskWtcontact = sequelize.define(
        'TaskWtcontact',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            taskId: {
                type: DataTypes.UUID,
                // unique: true,
                allowNull: true,
                references: {
                  model: 'task', 
                  key: 'id' 
                }
              },
              contactId:{
                type: DataTypes.STRING,
                allowNull: true,
                references: {
                  model: 'contact',
                  key: 'id'
                },
              },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {
            tableName: 'taskWtcontact',
            freezeTableName: true

        }
    );

    return TaskWtcontact;
};