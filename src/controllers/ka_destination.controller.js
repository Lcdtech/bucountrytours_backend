const ka_destinationService = require('../services/ka_destination.service');

const createKa_destination = async (req, res) => {
  try {
    const kA_destination = await ka_destinationService.createKa_destination(req.body);
    res.status(201).json({
      message: 'ka_destination created successfully',
      data: kA_destination,
    });
  } catch (error) {
    if (error.title === 'ValidationError') {
      res.status(400).json({
        message: 'Validation error',
        error: error.message,
        details: error.errors, 
      });
    } else {
      res.status(500).json({
        message: 'Error creating ka_destination',
        error: error.message,
      });
    }
  }
};


const updateKa_destination = async (req, res) => {
  const id = req.params.id;
  const ka_destinationData = req.body;
  try {
    const updatedKa_destination = await ka_destinationService.updateKa_destination(id, ka_destinationData);
    res.status(200).json({
      message: 'ka_destination updated successfully',
      data: updatedKa_destination,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating Ka_destination',
      error: error.message,
    });
  }
};


const getKa_destinationBy = async (req, res) => {
  const id = req.params.id;
  
  try {
    const KA_destination = await ka_destinationService.getKa_destinationById(id);
    res.status(200).json({
      message: 'Ka_destination found',
      data: KA_destination,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Ka_destination not found',
      error: error.message,
    });
  }
};

const getAllKa_destination = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const { KA_destinationsGroup, total } = await ka_destinationService.getAllKa_destination(page, limit);
    res.status(200).json({
      message: 'All Ka_destinations fetched successfully',
      data: KA_destinationsGroup,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching Ka_destinations',
      error: error.message,
    });
  }
};


const deletedKa_destination = async (req, res) => {
  const id = req.params.id;
  
  try {
    const deletedKa_destination = await ka_destinationService.deleteKa_destinationById(id);
    res.status(200).json({
      message: 'ka_destination deleted successfully',
      data: deletedKa_destination,
    });
  } catch (error) {
    res.status(404).json({
      message: 'ka_destination not found',
      error: error.message,
    });
  }
};

module.exports = {
 createKa_destination,
 updateKa_destination,
 getKa_destinationBy,
 getAllKa_destination,
 deletedKa_destination
};
