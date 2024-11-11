const dailyDepartureService = require('../services/dailyDeparture.service.js');

const getAllDailyDepartures = async (req, res) => {
    try {
      const { page = 1, limit = 30, search = '' } = req.query;
  
      const products = await dailyDepartureService.getAllDailyDepartures(page, limit, search); 
  
      return res.status(200).json({
        message: 'Products fetched successfully',
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching products',
        error: error.message,
      });
    }
  };

  module.exports = {
    getAllDailyDepartures
  };