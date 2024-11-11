const { Ka_destination, Ka_destinationsGroup} = require('../models') 

const createKa_destination = async (addPropertyData) => {
  try {
    const result = await Ka_destination.create(addPropertyData);
    return result;
  } catch (error) {
    console.error("Error creating ka_destination:", error);
    throw error; 
  }
};

  const updateKa_destination = async (id, addPropertyData) => {
    try {
      const [updated] = await Ka_destination.update(addPropertyData, {
        where: { id },
        returning: true, 
      });
      if (updated === 0) {
        throw new Error('Ka_destination not found');
      }
      const updatedKa_destination = await Ka_destination.findByPk(id);
      return updatedKa_destination;
    } catch (error) {
      throw new Error('Error updating Ka_destination: ' + error.message);
    }
  };

  const getKa_destinationById = async (id) => {
    try {
      const KA_destination = await Ka_destination.findByPk(id);
      if (!KA_destination) {
        throw new Error('Ka_destination not found');
      }
      return KA_destination;
    } catch (error) {
      throw new Error('Error fetching Ka_destination: ' + error.message);
    }
  };

  const getAllKa_destination = async (page, limit) => {
    try {
      const offset = (page - 1) * limit;
      const { rows: KA_destinationsGroup, count: total } = await Ka_destination.findAndCountAll({
        offset,
        limit: parseInt(limit, 10),
        where: { status: true  || 1} ,
        // order: [['createdAt', 'DESC']],
        include: [{ model: Ka_destinationsGroup }],
      });
  
      return { KA_destinationsGroup, total };
    } catch (error) {
      throw new Error('Error fetching Ka_destinations: ' + error.message);
    }
  };

  const deleteKa_destinationById = async (id) => {
    try {
      const deletedKa_destination = await Ka_destination.findByPk(id);
  
      if (!deletedKa_destination) {
        throw new Error('Ka_destination not found');
      }
  
      await Ka_destination.update({ status: false }, {
        where: { id }
      });
  
      return deletedKa_destination;
    } catch (error) {
      throw new Error('Error deleting ka_destination: ' + error.message);
    }
  };

 
module.exports = {
  createKa_destination,
  updateKa_destination,
  getKa_destinationById,
  getAllKa_destination,
  deleteKa_destinationById
};
