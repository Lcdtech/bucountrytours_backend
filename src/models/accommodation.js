module.exports = (sequelize, DataTypes) => {
    const Accommodation = sequelize.define(
        'Accommodation',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            productId: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            code: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            productStatus: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            images: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            destinations: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            types: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            themes: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            categories: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            videoLink: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            times: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            pickupPlaces: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            dropoffPlaces: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            locations: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            languagesTour: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            room: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            languages: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            cancellationPolicies: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            whatToBring: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            tasks: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            ageRanges: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            exclusions: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            inclusions: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
             resources: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            rates: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            },
            accommodation: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true,
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true,
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
            tableName: 'accommodation',
            freezeTableName: true

        },);
  
    return Accommodation;
};