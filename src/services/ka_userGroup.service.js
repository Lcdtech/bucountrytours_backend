const { Ka_userGroup} = require('../models'); 

const createKa_themeGroup = async (addPropertyData) => {
  try {
    const result = await Ka_userGroup.create(addPropertyData);
    return result;
  } catch (error) {
    console.error("Error creating Ka_userGroup:", error);
    throw error; 
  }
};

  const updateKa_themeGroup = async (id, addPropertyData) => {
    try {
      const [updated] = await Ka_userGroup.update(addPropertyData, {
        where: { id },
        returning: true, 
      });
      if (updated === 0) {
        throw new Error('Ka_userGroup not found');
      }
      const updatedKa_themeGroup = await Ka_userGroup.findByPk(id);
      return updatedKa_themeGroup;
    } catch (error) {
      throw new Error('Error updating Ka_userGroup: ' + error.message);
    }
  };

  const getKa_themeGroupById = async (id) => {
    try {
      const Ka_themeGroup = await Ka_userGroup.findByPk(id);

      if (!Ka_themeGroup) {
        throw new Error('Ka_userGroup not found');
      }
      return Ka_themeGroup;
    } catch (error) {
      throw new Error('Error fetching Ka_userGroup: ' + error.message);
    }
  };

  const getAllKa_themeGroup = async (page, limit) => { 
    try {
      const offset = (page - 1) * limit;
      const { rows: Ka_themeGroup, count: total } = await Ka_userGroup.findAndCountAll({
        offset,
        limit: parseInt(limit, 10),
        where: { status: true || 1},
        raw: true, 
      });
  
  
      return { Ka_themeGroup, total };
    } catch (error) {
      throw new Error('Error fetching Ka_userGroup: ' + error.message);
    }
  };

  const deleteKa_themeGroupById = async (id) => {
    try {
      const deletedKa_themeGroup = await Ka_userGroup.findByPk(id);
  
      if (!deletedKa_themeGroup) {
        throw new Error('Ka_userGroup not found');
      }
  
      await Ka_userGroup.update({ status: false }, {
        where: { id }
      });
  
      return deletedKa_themeGroup;
    } catch (error) {
      throw new Error('Error deleting Ka_userGroup: ' + error.message);
    }
  };

 
module.exports = {
  createKa_themeGroup,
  updateKa_themeGroup,
  getKa_themeGroupById,
  getAllKa_themeGroup,
  deleteKa_themeGroupById
};