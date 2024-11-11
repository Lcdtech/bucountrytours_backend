const { Ka_inclusionsGroup } = require('../models');

const createKa_inclusionsGroup = async (addPropertyData) => {
  try {
    const result = await Ka_inclusionsGroup.create(addPropertyData);
    return result;
  } catch (error) {
    console.error("Error creating ka_inclusionsGroup:", error);
    throw error; 
  }
};

  const updateKa_inclusionsGroup = async (id, addPropertyData) => {
    try {
      const [updated] = await Ka_inclusionsGroup.update(addPropertyData, {
        where: { id },
        returning: true, 
      });
      if (updated === 0) {
        throw new Error('Ka_inclusionsGroup not found');
      }
      const updatedKa_inclusionsGroup = await Ka_inclusionsGroup.findByPk(id);
      return updatedKa_inclusionsGroup;
    } catch (error) {
      throw new Error('Error updating Ka_inclusionsGroup: ' + error.message);
    }
  };

  const getKa_inclusionsGroupById = async (id) => {
    try {
      const Ka_inclusionsGroups = await Ka_inclusionsGroup.findByPk(id);

      if (!Ka_inclusionsGroups) {
        throw new Error('Ka_inclusionsGroup not found');
      }
      return Ka_inclusionsGroups;
    } catch (error) {
      throw new Error('Error fetching Ka_inclusionsGroup: ' + error.message);
    }
  };

  const getAllKa_inclusionsGroup = async (page, limit) => {
    try {
      const offset = (page - 1) * limit;
  
      const { rows: Ka_inclusionsGroups, count: total } = await Ka_inclusionsGroup.findAndCountAll({
        offset,
        limit: parseInt(limit, 10),
        where: { status: true  || 1} ,
        // order: [['createdAt', 'DESC']],
      });
  
      return { Ka_inclusionsGroups, total };
    } catch (error) {
      throw new Error('Error fetching Ka_inclusionsGroup: ' + error.message);
    }
  };

  const deleteKa_inclusionsGroupById = async (id) => {
    try {
      const deletedKa_inclusionsGroup = await Ka_inclusionsGroup.findByPk(id);
  
      if (!deletedKa_inclusionsGroup) {
        throw new Error('Ka_inclusionsGroup not found');
      }
  
      await Ka_inclusionsGroup.update({ status: false }, {
        where: { id }
      });
  
      return deletedKa_inclusionsGroup;
    } catch (error) {
      throw new Error('Error deleting ka_inclusionsGroup: ' + error.message);
    }
  };

 
module.exports = {
  createKa_inclusionsGroup,
  updateKa_inclusionsGroup,
  getKa_inclusionsGroupById,
  getAllKa_inclusionsGroup,
  deleteKa_inclusionsGroupById
};
