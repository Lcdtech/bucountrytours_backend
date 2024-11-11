const { Ka_cancellationPolicieGroup} = require('../models'); 

const createKa_themeGroup = async (addPropertyData) => {
  try {
    const result = await Ka_cancellationPolicieGroup.create(addPropertyData);
    console.log("Ka_cancellationPolicieGroup Created:", result);
    return result;
  } catch (error) {
    console.error("Error creating Ka_cancellationPolicieGroup:", error);
    throw error; 
  }
};

  const updateKa_themeGroup = async (id, addPropertyData) => {
    try {
      const [updated] = await Ka_cancellationPolicieGroup.update(addPropertyData, {
        where: { id },
        returning: true, 
      });
      if (updated === 0) {
        throw new Error('Ka_cancellationPolicieGroup not found');
      }
      const updatedKa_themeGroup = await Ka_cancellationPolicieGroup.findByPk(id);
      return updatedKa_themeGroup;
    } catch (error) {
      throw new Error('Error updating Ka_cancellationPolicieGroup: ' + error.message);
    }
  };

  const getKa_themeGroupById = async (id) => {
    try {
      const Ka_themeGroup = await Ka_cancellationPolicieGroup.findByPk(id);

      if (!Ka_themeGroup) {
        throw new Error('Ka_cancellationPolicieGroup not found');
      }
      return Ka_themeGroup;
    } catch (error) {
      throw new Error('Error fetching Ka_cancellationPolicieGroup: ' + error.message);
    }
  };


  const getAllKa_themeGroup = async (page, limit) => { 
    try {
      const offset = (page - 1) * limit;
      const { rows: Ka_themeGroup, count: total } = await Ka_cancellationPolicieGroup.findAndCountAll({
        offset,
        limit: parseInt(limit, 10),
        where: { status: true || 1},
        raw: true,  
      });
  
  
      return { Ka_themeGroup, total };
    } catch (error) {
      throw new Error('Error fetching Ka_cancellationPolicieGroup: ' + error.message);
    }
  };

  const deleteKa_themeGroupById = async (id) => {
    try {
      const deletedKa_themeGroup = await Ka_cancellationPolicieGroup.findByPk(id);
  
      if (!deletedKa_themeGroup) {
        throw new Error('Ka_cancellationPolicieGroup not found');
      }
  
      await Ka_cancellationPolicieGroup.update({ status: false }, {
        where: { id }
      });
  
      return deletedKa_themeGroup;
    } catch (error) {
      throw new Error('Error deleting Ka_cancellationPolicieGroup: ' + error.message);
    }
  };

 
module.exports = {
  createKa_themeGroup,
  updateKa_themeGroup,
  getKa_themeGroupById,
  getAllKa_themeGroup,
  deleteKa_themeGroupById
};