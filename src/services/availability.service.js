const { Availability } = require('../models'); 

const createAvailability = async (availabilityData) => {
  try {
    const newAvailability = await Availability.create(availabilityData);
    return newAvailability;
  } catch (error) {
    throw new Error(`Error creating availability: ${error.message}`);
  }
};
const updateAvailability = async (id, availabilityData) => {
    try {
      const availability = await Availability.findByPk(id);

      if (!availability) {
        return null; 
      }

      await availability.update(availabilityData);

      return availability;
    } catch (error) {
      throw new Error(`Error updating availability: ${error.message}`);
    }
  };

  const getAvailabilityById = async (id) => {
    try {
        const availability = await Availability.findByPk(id);
        if (!availability) {
            throw new Error('Availability not found');
        }
        return availability;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllAvailability = async () => {
    try {
        const availabilities = await Availability.findAll({ where: { status: true || 1   } })
        return availabilities;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteAvailabilityById = async (id) => {
    try {
        const availability = await Availability.findByPk(id);
        if (!availability) {
            throw new Error('Availability not found');
        }
        await availability.update({ status: false }, {
            where: { id }
          }); 
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};
module.exports = {
  createAvailability,
  updateAvailability,
  getAvailabilityById,
  getAllAvailability,
  deleteAvailabilityById
};
