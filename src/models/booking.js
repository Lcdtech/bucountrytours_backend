module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define(
        'Booking',
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
            productTitle: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            productDate: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            productTime: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            total: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            pickupPlace: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            dropOffPlace: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            currency: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            rate: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            paymentMethod: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            bookingRef: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            firstName: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            lastName: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            email: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            phoneNo: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            country: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            organization: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            noteForBooking: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            noteForFinance: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            noteForOperations: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            emailTicketSend: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false,
            },
            markAsArrived: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
              defaultValue: false,
            },
            ticket: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
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
            tableName: 'bookings',
            freezeTableName: true

        },);
 
    return Booking;
};