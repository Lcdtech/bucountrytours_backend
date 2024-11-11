const bookingService = require('../services/booking.service.js');

const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;  
    const newBooking = await bookingService.createBooking(bookingData);  
    return res.status(201).json({
      message: 'Booking created successfully',
      data: newBooking
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating booking',
      error: error.message
    });
  }
};
const updateBooking = async (req, res) => {
    try {
      const bookingId = req.params.id; 
      const bookingData = req.body;    
      const updatedBooking = await bookingService.updateBooking(bookingId, bookingData);
  
      if (!updatedBooking) {
        return res.status(404).json({
          message: 'Booking not found',
        });
      }
  
      return res.status(200).json({
        message: 'Booking updated successfully',
        data: updatedBooking,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating booking',
        error: error.message,
      });
    }
};
const getBookingById = async (req, res) => {
    try {
      const bookingId = req.params.id;  
  
      const booking = await bookingService.getBookingById(bookingId);
  
      if (!booking) {
        return res.status(404).json({
          message: 'Booking not found',
        });
      }
  
      return res.status(200).json({
        message: 'Booking fetched successfully',
        data: booking,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching booking',
        error: error.message,
      });
    }
  };

  const getAllBookings = async (req, res) => {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
  
      const bookings = await bookingService.getAllBookings(page, limit, search); 
  
      return res.status(200).json({
        message: 'Bookings fetched successfully',
        data: bookings,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching bookings',
        error: error.message,
      });
    }
  };
  
  
  const deleteBooking = async (req, res) => {
    try {
      const { id } = req.params; 
      const deletedBooking = await bookingService.deleteBooking(id);
  
      if (!deletedBooking) {
        return res.status(404).json({
          message: 'Booking not found',
        });
      }
  
      return res.status(200).json({
        message: 'Booking deleted successfully',
        data: deletedBooking,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error deleting booking',
        error: error.message,
      });
    }
  };
module.exports = {
  createBooking,
  updateBooking,
  getBookingById,
  getAllBookings,
  deleteBooking
};
