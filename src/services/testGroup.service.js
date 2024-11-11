const { TestGroup} = require('../models'); 

const createKa_theme = async (addPropertyData) => {
  try {
    const result = await TestGroup.create(addPropertyData);
    return result;
  } catch (error) {
    console.error("Error creating TestGroup:", error);
    throw error; 
  }
};

  const updateKa_theme = async (id, addPropertyData) => {
    try {
      const [updated] = await TestGroup.update(addPropertyData, {
        where: { id },
        returning: true, 
       
      });
      if (updated === 0) {
        throw new Error('TestGroup not found');
      }
      const updatedKa_theme = await TestGroup.findByPk(id);
      return updatedKa_theme;
    } catch (error) {
      throw new Error('Error updating TestGroup: ' + error.message);
    }
  };

  const getKa_themeById = async (id) => {
    try {
      const KA_theme = await TestGroup.findByPk(id);
      if (!KA_theme) {
        throw new Error('TestGroup not found');
      }
      return KA_theme;
    } catch (error) {
      throw new Error('Error fetching TestGroup: ' + error.message);
    }
  };

  const getAllKa_theme = async (page, limit) => {
    try {
      const offset = (page - 1) * limit;
      const { rows: KA_theme, count: total } = await TestGroup.findAndCountAll({
        offset,
        limit: parseInt(limit, 10),
        where: { status: true  || 1} ,
       // include: [{ model: ka_themesGroup }],
        // order: [['createdAt', 'DESC']],
      });
  
      return { KA_theme, total };
    } catch (error) {
      throw new Error('Error fetching TestGroup: ' + error.message);
    }
  };


  const deleteKa_themeById = async (id) => {
    try {
      const deletedKa_theme = await TestGroup.findByPk(id);
  
      if (!deletedKa_theme) {
        throw new Error('TestGroup not found');
      }
  
      await Test.update({ status: false }, {
        where: { id }
      });
  
      return deletedKa_theme;
    } catch (error) {
      throw new Error('Error deleting TestGroup: ' + error.message);
    }
  };

 
module.exports = {
  createKa_theme,
  updateKa_theme,
  getKa_themeById,
  getAllKa_theme,
  deleteKa_themeById
};
