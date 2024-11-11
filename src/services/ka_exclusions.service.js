const { Ka_exclusion, Ka_exclusionsGroup} = require('../models'); 

const createKa_exclusions = async (addPropertyData) => {
  try {
    const result = await Ka_exclusion.create(addPropertyData);
    return result;
  } catch (error) {
    console.error("Error creating ka_exclusions:", error);
    throw error; 
  }
};

  const updateKa_exclusions = async (id, addPropertyData) => {
    try {
      const [updated] = await Ka_exclusion.update(addPropertyData, {
        where: { id },
        returning: true, 
      });
      if (updated === 0) {
        throw new Error('Ka_exclusions not found');
      }
      const updatedKa_exclusions = await Ka_exclusion.findByPk(id);
      return updatedKa_exclusions;
    } catch (error) {
      throw new Error('Error updating Ka_exclusions: ' + error.message);
    }
  };

  const getKa_exclusionsById = async (id) => {
    try {
      const Ka_exclusions = await Ka_exclusion.findByPk(id);
      if (!Ka_exclusions) {
        throw new Error('Ka_exclusions not found');
      }
      return Ka_exclusions;
    } catch (error) {
      throw new Error('Error fetching Ka_exclusions: ' + error.message);
    }
  };

  const getAllKa_exclusions = async (page, limit) => {
    try {
      const offset = (page - 1) * limit;
  
      const { rows: Ka_exclusions, count: total } = await Ka_exclusion.findAndCountAll({
        offset,
        limit: parseInt(limit, 10),
        where: { status: true || 1},
        include: [{ model: Ka_exclusionsGroup }],
      });
  
      return { Ka_exclusions, total };
    } catch (error) {
      throw new Error('Error fetching Ka_exclusions: ' + error.message);
    }
  };
  

  const deleteKa_exclusionsById = async (id) => {
    try {
      const deletedKa_exclusions = await Ka_exclusion.findByPk(id);
  
      if (!deletedKa_exclusions) {
        throw new Error('Ka_exclusions not found');
      }
  
      await Ka_exclusion.update({ status: false }, {
        where: { id }
      });
  
      return deletedKa_exclusions;
    } catch (error) {
      throw new Error('Error deleting ka_exclusions: ' + error.message);
    }
  };

 
module.exports = {
  createKa_exclusions,
  updateKa_exclusions,
  getKa_exclusionsById,
  getAllKa_exclusions,
  deleteKa_exclusionsById
};
