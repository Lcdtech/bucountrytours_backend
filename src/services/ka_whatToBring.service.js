const { Ka_whatToBring, Ka_whatToBringGroup} = require('../models'); 

const createKa_theme = async (addPropertyData) => {
  try {
    const result = await Ka_whatToBring.create(addPropertyData);
    return result;
  } catch (error) {
    console.error("Error creating Ka_whatToBring:", error);
    throw error; 
  }
};

  const updateKa_theme = async (id, addPropertyData) => {
    try {
      const [updated] = await Ka_whatToBring.update(addPropertyData, {
        where: { id },
        returning: true, 
      });
      if (updated === 0) {
        throw new Error('Ka_whatToBring not found');
      }
      const updatedKa_theme = await Ka_whatToBring.findByPk(id);
      return updatedKa_theme;
    } catch (error) {
      throw new Error('Error updating Ka_whatToBring: ' + error.message);
    }
  };

  const getKa_themeById = async (id) => {
    try {
      const KA_theme = await Ka_whatToBring.findByPk(id);
      if (!KA_theme) {
        throw new Error('Ka_whatToBring not found');
      }
      return KA_theme;
    } catch (error) {
      throw new Error('Error fetching Ka_whatToBring: ' + error.message);
    }
  };

  const getAllKa_theme = async (page, limit) => {
    try {
      const offset = (page - 1) * limit;
      const { rows: KA_theme, count: total } = await Ka_whatToBring.findAndCountAll({
        offset,
        limit: parseInt(limit, 10),
        where: { status: true  || 1} ,
        // order: [['createdAt', 'DESC']],
        include: [{ model: Ka_whatToBringGroup }],
      });
  
      return { KA_theme, total };
    } catch (error) {
      throw new Error('Error fetching Ka_whatToBring: ' + error.message);
    }
  };


  const deleteKa_themeById = async (id) => {
    try {
      const deletedKa_theme = await Ka_whatToBring.findByPk(id);
  
      if (!deletedKa_theme) {
        throw new Error('Ka_whatToBring not found');
      }
  
      await Ka_whatToBring.update({ status: false }, {
        where: { id }
      });
  
      return deletedKa_theme;
    } catch (error) {
      throw new Error('Error deleting Ka_whatToBring: ' + error.message);
    }
  };

 
module.exports = {
  createKa_theme,
  updateKa_theme,
  getKa_themeById,
  getAllKa_theme,
  deleteKa_themeById
};
