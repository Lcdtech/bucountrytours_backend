module.exports = (sequelize, DataTypes) => {
    const Availability = sequelize.define(
      'Availability',
      {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
          },
          date: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: "[]"
          },
          startTime: {
            type: DataTypes.JSON, 
            allowNull: true,
          },
          dateAndTime: {
            type: DataTypes.JSON,
            allowNull: true,
          },
          time: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          recurrenceRuleIds: {
            type: DataTypes.JSON,
            allowNull: true,
          },
          total: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          pickupTotal: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue:0
          },
          minimum: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue:0
          },
          booked: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue:0
          },
          pickupBooked: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue:0
          },
          available: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue:0
          },
          pickupAvailable: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue:0
          },
          pickupAllotment: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
          },
          freeSale: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
          },
          closed: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
          },
          unavailable: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue:false
          },
          guidedLanguages: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:""
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
        tableName: 'availabilities',
        freezeTableName: true

    },);

// Profile.associate = (models) => {
//   Profile.hasMany(models.Contact, {
//     foreignKey: 'profileId',
//     sourceKey: 'id',
//   });
// }
return Availability;
};