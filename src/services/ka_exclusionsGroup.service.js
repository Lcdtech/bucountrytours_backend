const { Ka_exclusionsGroup } = require('../models');

const createKa_exclusionsGroup = async (addPropertyData) => {
  try {
    const result = await Ka_exclusionsGroup.create(addPropertyData);
    return result;
  } catch (error) {
    console.error("Error creating ka_exclusionsGroup:", error);
    throw error; 
  }
};

  const updateKa_exclusionsGroup = async (id, addPropertyData) => {
    try {
      const [updated] = await Ka_exclusionsGroup.update(addPropertyData, {
        where: { id },
        returning: true, 
      });
      if (updated === 0) {
        throw new Error('Ka_exclusionsGroup not found');
      }
      const updatedKa_exclusionsGroup = await Ka_exclusionsGroup.findByPk(id);
      return updatedKa_exclusionsGroup;
    } catch (error) {
      throw new Error('Error updating Ka_exclusionsGroup: ' + error.message);
    }
  };

  const getKa_exclusionsGroupById = async (id) => {
    try {
      const Ka_exclusionsGroups = await Ka_exclusionsGroup.findByPk(id);

      if (!Ka_exclusionsGroups) {
        throw new Error('Ka_exclusionsGroup not found');
      }
      return Ka_exclusionsGroups;
    } catch (error) {
      throw new Error('Error fetching Ka_exclusionsGroup: ' + error.message);
    }
  };

  const getAllKa_exclusionsGroup = async (page, limit) => {
    try {
      const offset = (page - 1) * limit;
  
      const { rows: Ka_exclusionsGroups, count: total } = await Ka_exclusionsGroup.findAndCountAll({
        offset,
        limit: parseInt(limit, 10),
        where: { status: true || 1} ,
        // order: [['createdAt', 'DESC']],
      });
  
      return { Ka_exclusionsGroups, total };
    } catch (error) {
      throw new Error('Error fetching Ka_exclusionsGroup: ' + error.message);
    }
  };

  const deleteKa_exclusionsGroupById = async (id) => {
    try {
      const deletedKa_exclusionsGroup = await Ka_exclusionsGroup.findByPk(id);
  
      if (!deletedKa_exclusionsGroup) {
        throw new Error('Ka_exclusionsGroup not found');
      }
  
      await Ka_exclusionsGroup.update({ status: false }, {
        where: { id }
      });
  
      return deletedKa_exclusionsGroup;
    } catch (error) {
      throw new Error('Error deleting ka_exclusionsGroup: ' + error.message);
    }
  };

 
module.exports = {
  createKa_exclusionsGroup,
  updateKa_exclusionsGroup,
  getKa_exclusionsGroupById,
  getAllKa_exclusionsGroup,
  deleteKa_exclusionsGroupById
};