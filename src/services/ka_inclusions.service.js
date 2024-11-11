const { Ka_inclusion,Ka_inclusionsGroup } = require("../models");


const createKa_inclusions = async (addPropertyData) => {
  try {
    const result = await Ka_inclusion.create(addPropertyData);
    return result;
  } catch (error) {
    console.error("Error creating ka_inclusions:", error);
    throw error; 
  }
};
  
    const updateKa_inclusions = async (id, addKa_inclusionsData) => {
      try {
        const [updated] = await Ka_inclusion.update(addKa_inclusionsData, {
          where: { id },
          returning: true, 
        });
        if (updated === 0) {
          throw new Error('Ka_inclusions not found');
        }
        
        const updatedKa_inclusions = await Ka_inclusion.findByPk(id);
        return updatedKa_inclusions;
      } catch (error) {
        throw new Error('Error updating Ka_inclusions: ' + error.message);
      }
    };
  
    const getKa_inclusionsById = async (id) => {
      try {
        const ka_inclusions = await Ka_inclusion.findByPk(id);
        if (!ka_inclusions) {
          throw new Error('Ka_inclusions not found');
        }
        return ka_inclusions;
      } catch (error) {
        throw new Error('Error fetching Ka_inclusions: ' + error.message);
      }
    };
  
    const getAllKa_inclusions = async (page, limit) => {
      try {
        const offset = (page - 1) * limit;
      
        const { rows: ka_inclusions, count: total } = await Ka_inclusion.findAndCountAll({
          offset,
          limit: parseInt(limit, 10),
          where: { status: true || 1 } ,
          //order: [['createdAt', 'DESC']],
          include: [{ model: Ka_inclusionsGroup }],
          
        });
        return { ka_inclusions, total };
      } catch (error) {
        throw new Error('Error fetching AddKa_inclusions: ' + error.message);
      }
    };
  
    const deleteKa_inclusionsById = async (id) => {
      try {
        const deletedKa_inclusions = await Ka_inclusion.findByPk(id);
    
        if (!deletedKa_inclusions) {
          throw new Error('Ka_inclusions not found');
        }
    
        await Ka_inclusion.update({ status: false }, {
          where: { id }
        });
    
        return deletedKa_inclusions;
      } catch (error) {
        throw new Error('Error deleting Ka_inclusions: ' + error.message);
      }
    };
module.exports = {
     createKa_inclusions,
     updateKa_inclusions,
     getKa_inclusionsById,
     getAllKa_inclusions,
     deleteKa_inclusionsById
};
