const { Ka_categorie, Ka_categoriesGroup} = require('../models')

const createKa_categories = async (addPropertyData) => {
  try {
    const result = await Ka_categorie.create(addPropertyData);
    return result;
  } catch (error) {
    console.error("Error creating ka_categories:", error);
    throw error; 
  }
};

  const updateKa_categories = async (id, addPropertyData) => {
    try {
      const [updated] = await Ka_categorie.update(addPropertyData, {
        where: { id },
        returning: true, 
      });
      if (updated === 0) {
        throw new Error('Ka_categories not found');
      }
      const updatedKa_categories = await Ka_categorie.findByPk(id);
      return updatedKa_categories;
    } catch (error) {
      throw new Error('Error updating Ka_categories: ' + error.message);
    }
  };

  const getKa_categoriesById = async (id) => {
    try {
      const KA_categorie = await Ka_categorie.findByPk(id);
      if (!KA_categorie) {
        throw new Error('Ka_categorie not found');
      }
      return KA_categorie;
    } catch (error) {
      throw new Error('Error fetching Ka_categorie: ' + error.message);
    }
  };

  const getAllKa_categories = async (page, limit) => {
    try {
      const offset = (page - 1) * limit;
  
      const { rows: Ka_categories, count: total } = await Ka_categorie.findAndCountAll({
        offset,
        limit: parseInt(limit, 10),
        where: { status: true || 1} ,
        order: [['createdAt', 'DESC']],
        include: [{ model: Ka_categoriesGroup }],
      });
  
      return { Ka_categories, total };
    } catch (error) {
      throw new Error('Error fetching Ka_categories: ' + error.message);
    }
  };

  const deleteKa_categoriesById = async (id) => {
    try {
      const deletedKa_categories = await Ka_categorie.findByPk(id);
  
      if (!deletedKa_categories) {
        throw new Error('Ka_categories not found');
      }
  
      await Ka_categorie.update({ status: false }, {
        where: { id }
      });
  
      return deletedKa_categories;
    } catch (error) {
      throw new Error('Error deleting ka_categories: ' + error.message);
    }
  };

 
module.exports = {
  createKa_categories,
  updateKa_categories,
  getKa_categoriesById,
  getAllKa_categories,
  deleteKa_categoriesById
};
