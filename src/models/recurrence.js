module.exports = (sequelize, DataTypes) => {
    const Recurrence = sequelize.define(
        'Recurrence',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            index: {
                allowNull: false,
                autoIncrement: true,
                unique: true,
                type: DataTypes.INTEGER
              },
              rule: {
                type: DataTypes.JSON, 
                allowNull: true,
              },
              recurrenceType: {
                type: DataTypes.STRING, 
                allowNull: true,
                defaultValue: "OPEN",
              },
              type: {
                type: DataTypes.STRING, 
                allowNull: true,
              },
              maxCapacity: {
                type: DataTypes.INTEGER, 
                allowNull: true
              },
              maxCapacityForPickup: {
                type: DataTypes.INTEGER, 
                allowNull: true
              },
              minTotalPax: {
                type: DataTypes.INTEGER, 
                allowNull: true
              },
              startDate: {
                type: DataTypes.JSON, 
                allowNull: true,
              },
              endDate: {
                type: DataTypes.JSON, 
                allowNull: true,
              },
              color: {
                type: DataTypes.STRING, 
                allowNull: true
              },
              label: {
                type: DataTypes.STRING, 
                allowNull: true
              },
              affectedStartTimes: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: "[]"
              },
              guidedLanguages: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: "[]"
              },
              bom: {
                type: DataTypes.JSON, 
                allowNull: true,
              },
              guidedLangs: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: "[]"
              },
            status: {
                type: DataTypes.BOOLEAN,
                default: true
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
            tableName: 'recurrences',
            freezeTableName: true

        },);

    // Profile.associate = (models) => {
    //   Profile.hasMany(models.Contact, {
    //     foreignKey: 'profileId',
    //     sourceKey: 'id',
    //   });
    // }
    return Recurrence;
};