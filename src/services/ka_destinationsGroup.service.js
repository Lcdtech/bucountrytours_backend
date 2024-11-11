const { Ka_destinationsGroup} = require('../models'); 

const createKa_destinationsGroup = async (addPropertyData) => {
  try {
    const result = await Ka_destinationsGroup.create(addPropertyData);
    return result;
  } catch (error) {
    console.error("Error creating ka_destinationsGroup:", error);
    throw error; 
  }
};

  const updateKa_destinationsGroup = async (id, addPropertyData) => {
    try {
      const [updated] = await Ka_destinationsGroup.update(addPropertyData, {
        where: { id },
        returning: true, 
      });
      if (updated === 0) {
        throw new Error('Ka_destinationsGroup not found');
      }
      const updatedKa_destinationsGroup = await Ka_destinationsGroup.findByPk(id);
      return updatedKa_destinationsGroup;
    } catch (error) {
      throw new Error('Error updating Ka_destinationsGroup: ' + error.message);
    }
  };

  const getKa_destinationsGroupById = async (id) => {
    try {
      const KA_destinationsGroup = await Ka_destinationsGroup.findByPk(id);
      if (!KA_destinationsGroup) {
        throw new Error('Ka_destinationsGroup not found');
      }
      return KA_destinationsGroup;
    } catch (error) {
      throw new Error('Error fetching Ka_destinationsGroup: ' + error.message);
    }
  };

  const getAllKa_destinationsGroup = async (page, limit) => {
    try {
      const offset = (page - 1) * limit;
      const { rows: KA_destinationsGroup, count: total } = await Ka_destinationsGroup.findAndCountAll({
        offset,
        limit: parseInt(limit, 10),
        where: { status: true  || 1} ,
        // order: [['createdAt', 'DESC']],
      });
  
      return { KA_destinationsGroup, total };
    } catch (error) {
      throw new Error('Error fetching Ka_destinationsGroup: ' + error.message);
    }
  };


  const deleteKa_destinationsGroupById = async (id) => {
    try {
      const deletedKa_destinationsGroup = await Ka_destinationsGroup.findByPk(id);
  
      if (!deletedKa_destinationsGroup) {
        throw new Error('Ka_destinationsGroup not found');
      }
  
      await Ka_destinationsGroup.update({ status: false }, {
        where: { id }
      });
  
      return deletedKa_destinationsGroup;
    } catch (error) {
      throw new Error('Error deleting ka_destinationsGroup: ' + error.message);
    }
  };

 
module.exports = {
  createKa_destinationsGroup,
  updateKa_destinationsGroup,
  getKa_destinationsGroupById,
  getAllKa_destinationsGroup,
  deleteKa_destinationsGroupById
};
