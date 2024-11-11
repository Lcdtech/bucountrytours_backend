const {taskProperty} = require('../models'); 

const createAddProperty = async (addPropertyData) => {
  try {
    const result = await taskProperty.create(addPropertyData);
    return result;
  } catch (error) {
    console.error("Error creating taskProperty:", error);
    throw error; 
  }
};

  const updateAddProperty = async (id, addPropertyData) => {
    try {
      const [updated] = await taskProperty.update(addPropertyData, {
        where: { id },
        returning: true, 
      });
      if (updated === 0) {
        throw new Error('taskProperty not found');
      }
      const updatedAddProperty = await taskProperty.findByPk(id);
      return updatedAddProperty;
    } catch (error) {
      throw new Error('Error updating taskProperty: ' + error.message);
    }
  };

  const getAddPropertyById = async (id) => {
    try {
      const AddPropertys = await taskProperty.findByPk(id);
      if (!AddPropertys) {
        throw new Error('taskProperty not found');
      }
      return AddPropertys;
    } catch (error) {
      throw new Error('Error fetching taskProperty: ' + error.message);
    }
  };

  const getAllAddProperty = async (page, limit) => {
    try {
      const offset = (page - 1) * limit;
  
      const { rows: AddPropertys, count: total } = await taskProperty.findAndCountAll({
        offset,
        limit: parseInt(limit, 10),
        where: { status: true } ,
        order: [['createdAt', 'DESC']],
      });
  
      return { AddPropertys, total };
    } catch (error) {
      throw new Error('Error fetching AddPropertys: ' + error.message);
    }
  };

  const deleteAddPropertyById = async (id) => {
    try {
      const deletedAddProperty = await taskProperty.findByPk(id);
  
      if (!deletedAddProperty) {
        throw new Error('taskProperty not found');
      }
  
      await taskProperty.update({ status: false }, {
        where: { id }
      });
  
      return deletedAddProperty;
    } catch (error) {
      throw new Error('Error deleting taskProperty: ' + error.message);
    }
  };

 
module.exports = {
  createAddProperty,
  updateAddProperty,
  getAddPropertyById,
  getAllAddProperty,
  deleteAddPropertyById,
};
