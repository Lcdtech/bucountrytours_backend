const { Ka_cancellationPolicie, Ka_cancellationPolicieGroup} = require('../models'); 

const createKa_theme = async (addPropertyData) => {
  try {
    const result = await Ka_cancellationPolicie.create(addPropertyData);
    return result;
  } catch (error) {
    console.error("Error creating Ka_cancellationPolicie:", error);
    throw error; 
  }
};

  const updateKa_theme = async (id, addPropertyData) => {
    try {
      const [updated] = await Ka_cancellationPolicie.update(addPropertyData, {
        where: { id },
        returning: true, 
      });
      if (updated === 0) {
        throw new Error('Ka_cancellationPolicie not found');
      }
      const updatedKa_theme = await Ka_cancellationPolicie.findByPk(id);
      return updatedKa_theme;
    } catch (error) {
      throw new Error('Error updating Ka_cancellationPolicie: ' + error.message);
    }
  };

  const getKa_themeById = async (id) => {
    try {
      const KA_theme = await Ka_cancellationPolicie.findByPk(id);
      if (!KA_theme) {
        throw new Error('Ka_themKa_cancellationPoliciee not found');
      }
      return KA_theme;
    } catch (error) {
      throw new Error('Error fetching Ka_cancellationPolicie: ' + error.message);
    }
  };

  const getAllKa_theme = async (page, limit) => {
    try {
      const offset = (page - 1) * limit;
      const { rows: KA_theme, count: total } = await Ka_cancellationPolicie.findAndCountAll({
        offset,
        limit: parseInt(limit, 10),
        where: { status: true  || 1} ,
        // order: [['createdAt', 'DESC']],
        include: [{ model: Ka_cancellationPolicieGroup }],
      });
     
      return { KA_theme, total };
    } catch (error) {
      throw new Error('Error fetching Ka_cancellationPolicie: ' + error.message);
    }
  };


  const deleteKa_themeById = async (id) => {
    try {
      const deletedKa_theme = await Ka_cancellationPolicie.findByPk(id);
  
      if (!deletedKa_theme) {
        throw new Error('Ka_cancellationPolicie not found');
      }
  
      await Ka_cancellationPolicie.update({ status: false }, {
        where: { id }
      });
  
      return deletedKa_theme;
    } catch (error) {
      throw new Error('Error deleting Ka_cancellationPolicie: ' + error.message);
    }
  };

 
module.exports = {
  createKa_theme,
  updateKa_theme,
  getKa_themeById,
  getAllKa_theme,
  deleteKa_themeById
};
