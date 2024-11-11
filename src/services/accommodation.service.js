const { Accommodation } = require('../models'); 
const { Op } = require('sequelize');
const createAccommodation = async (accommodationData) => {
  try {
    const result = await Accommodation.create(accommodationData);
    return result; 
  } catch (error) {
    console.error("Error creating accommodation:", error);
    throw error; 
  }
};
const updateAccommodation = async (id, updateData) => {
  try {
    const accommodation = await Accommodation.findByPk(id);
    if (!accommodation) {
      throw new Error('accommodation not found');
    }

    await accommodation.update(updateData);
    return accommodation;
  } catch (error) {
    throw new Error(error.message);
  }
};

  const getAccommodationById = async (accommodationId) => {
    try {
      const accommodation = await Accommodation.findByPk(accommodationId);
  
      if (!accommodation) {
        return null;
      }
      return accommodation;  
    } catch (error) {
      console.error("Error fetching accommodation by ID:", error);
      throw error;
    }
  };
  const getAllAccommodations = async (page, limit, search) => {
    try {
      const offset = (page - 1) * limit;
      
      const whereCondition = {
        status: true, 
      };
  
      if (search) {
        whereCondition[Op.or] = [
          { code: { [Op.like]: `%${search}%` } }, 
          { title: { [Op.like]: `%${search}%` } } 
        ];
      }
  
      console.log("Where Condition for Accommodations:", JSON.stringify(whereCondition, null, 2));
  
      const accommodations = await Accommodation.findAndCountAll({
        where: whereCondition,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });
  
      return {
        total: accommodations.count,
        totalPages: Math.ceil(accommodations.count / limit),
        currentPage: page,
        accommodations: accommodations.rows,
      };
    } catch (error) {
      console.error("Error fetching accommodations:", error);
      throw error;
    }
  };
  const deleteAccommodation = async (id) => {
    try {
      const accommodation = await Accommodation.findByPk(id); 
  
      if (!accommodation) {
        return null; 
      }
  
      await accommodation.update({ status: false }, {
        where: { id }
      }); 
      return accommodation; 
    } catch (error) {
      console.error("Error deleting accommodation:", error);
      throw error; 
    }
  };
module.exports = {
  createAccommodation,
  updateAccommodation,
  getAccommodationById,
  getAllAccommodations,
  deleteAccommodation
};