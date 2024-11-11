const { Ka_ageRange, Ka_ageRangeGroup} = require('../models'); 

const createKa_theme = async (addPropertyData) => {
  try {
    const result = await Ka_ageRange.create(addPropertyData);
    return result;
  } catch (error) {
    console.error("Error creating Ka_ageRange:", error);
    throw error; 
  }
};

  const updateKa_theme = async (id, addPropertyData) => {
    try {
      const [updated] = await Ka_ageRange.update(addPropertyData, {
        where: { id },
        returning: true, 
      });
      if (updated === 0) {
        throw new Error('Ka_ageRange not found');
      }
      const updatedKa_theme = await Ka_ageRange.findByPk(id);
      return updatedKa_theme;
    } catch (error) {
      throw new Error('Error updating Ka_ageRange: ' + error.message);
    }
  };

  const getKa_themeById = async (id) => {
    try {
      const KA_theme = await Ka_ageRange.findByPk(id);
      if (!KA_theme) {
        throw new Error('Ka_ageRange not found');
      }
      return KA_theme;
    } catch (error) {
      throw new Error('Error fetching Ka_ageRange: ' + error.message);
    }
  };

  const getAllKa_theme = async (page, limit) => {
    try {
      const offset = (page - 1) * limit;
      const { rows: KA_theme, count: total } = await Ka_ageRange.findAndCountAll({
        offset,
        limit: parseInt(limit, 10),
        where: { status: true  || 1} ,
        // order: [['createdAt', 'DESC']],
        include: [{ model: Ka_ageRangeGroup }],
      });
  
      return { KA_theme, total };
    } catch (error) {
      throw new Error('Error fetching Ka_ageRange: ' + error.message);
    }
  };


  const deleteKa_themeById = async (id) => {
    try {
      const deletedKa_theme = await Ka_ageRange.findByPk(id);
  
      if (!deletedKa_theme) {
        throw new Error('Ka_ageRange not found');
      }
  
      await Ka_ageRange.update({ status: false }, {
        where: { id }
      });
  
      return deletedKa_theme;
    } catch (error) {
      throw new Error('Error deleting Ka_ageRange: ' + error.message);
    }
  };

 
module.exports = {
  createKa_theme,
  updateKa_theme,
  getKa_themeById,
  getAllKa_theme,
  deleteKa_themeById
};
