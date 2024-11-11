const { Booking } = require('../models'); 
const { Op } = require('sequelize'); // Ensure you have this import if not already

const createBooking = async (bookingData) => {
  try {
    const result = await Booking.create(bookingData);
    return result; 
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error; 
  }
};
const updateBooking = async (id, updateData) => {
  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      throw new Error('Booking not found');
    }

    await booking.update(updateData);
    return booking;
  } catch (error) {
    throw new Error(error.message);
  }
};

  const getBookingById = async (bookingId) => {
    try {
      const booking = await Booking.findByPk(bookingId);
  
      if (!booking) {
        return null;
      }
      return booking;  
    } catch (error) {
      console.error("Error fetching booking by ID:", error);
      throw error;
    }
  };
  const getAllBookings = async (page, limit, search) => {
    try {
      const offset = (page - 1) * limit;
      const whereCondition = search ? {
        firstName: { [Op.like]: `%${search}%` }
      } : {};
  
      const bookings = await Booking.findAndCountAll({
        where: whereCondition,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });
  
      return {
        total: bookings.count,
        totalPages: Math.ceil(bookings.count / limit),
        currentPage: page,
        bookings: bookings.rows,
      };
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  };
  const deleteBooking = async (id) => {
    try {
      const booking = await Booking.findByPk(id); 
  
      if (!booking) {
        return null; 
      }
  
      await booking.update({ status: false }, {
        where: { id }
      }); 
      return booking; 
    } catch (error) {
      console.error("Error deleting booking:", error);
      throw error; 
    }
  };
module.exports = {
  createBooking,
  updateBooking,
  getBookingById,
  getAllBookings,
  deleteBooking
};