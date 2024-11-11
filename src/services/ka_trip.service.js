const { Ka_trip} = require('../models'); 

const createKa_theme = async (addPropertyData) => {
  try {
    const result = await Ka_trip.create(addPropertyData);
    return result;
  } catch (error) {
    console.error("Error creating Ka_trip:", error);
    throw error; 
  }
};

  const updateKa_theme = async (id, addPropertyData) => {
    try {
      const [updated] = await Ka_trip.update(addPropertyData, {
        where: { id },
        returning: true, 
       
      });
      if (updated === 0) {
        throw new Error('Ka_trip not found');
      }
      const updatedKa_theme = await Ka_trip.findByPk(id);
      return updatedKa_theme;
    } catch (error) {
      throw new Error('Error updating Ka_trip: ' + error.message);
    }
  };

  const getKa_themeById = async (id) => {
    try {
      const KA_theme = await Ka_trip.findByPk(id);
      if (!KA_theme) {
        throw new Error('Ka_trip not found');
      }
      return KA_theme;
    } catch (error) {
      throw new Error('Error fetching Ka_trip: ' + error.message);
    }
  };

  const getAllKa_theme = async (page, limit) => {
    try {
      const offset = (page - 1) * limit;
  
      const { rows: KA_theme, count: total } = await Ka_trip.findAndCountAll({
        offset,
        limit: parseInt(limit, 10),
        where: { status: true || 1 },  
        // include: [{ model: Ka_themesGroup }],
        // order: [['createdAt', 'DESC']],
      });
  
   
      const totalPages = Math.ceil(total / limit);

      return {
        KA_theme,
        total,  
        totalPages, 
        currentPage: page,
      };
    } catch (error) {
      throw new Error('Error fetching Ka_trip: ' + error.message);
    }
  };


  const deleteKa_themeById = async (id) => {
    try {
      const deletedKa_theme = await Ka_trip.findByPk(id);
  
      if (!deletedKa_theme) {
        throw new Error('Ka_trip not found');
      }
  
      await Ka_trip.update({ status: false }, {
        where: { id }
      });
  
      return deletedKa_theme;
    } catch (error) {
      throw new Error('Error deleting Ka_trip: ' + error.message);
    }
  };

 
module.exports = {
  createKa_theme,
  updateKa_theme,
  getKa_themeById,
  getAllKa_theme,
  deleteKa_themeById
};
