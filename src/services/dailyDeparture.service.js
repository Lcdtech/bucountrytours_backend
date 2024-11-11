const { Product } = require('../models'); 
const { Op } = require('sequelize'); // Ensure you have this import if not already

const splitObjectsByTimes = (obj) => {
    return obj.recurrences.affectedStartTimes.map(time => ({
      ...obj,             // Copy all original properties
      times: [time]       // Replace times array with a single-element array
    }));
  };


  const getAllDailyDepartures = async (page, limit, search) => {
    try {
      const offset = (page - 1) * limit;
      const whereCondition = {
        status: true, // Always include the status condition
      };
  
      if (search) {
        whereCondition[Op.or] = [
          { code: { [Op.eq]: search } }, // Change to exact match for code
          { title: { [Op.like]: `%${search}%` } } // Keep like match for title
        ];
      }
      const products = await Product.findAndCountAll({
        where: whereCondition,
        where:{status: true},
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });

      let dailyListArray =[];
      for(var product  of products.rows){
        let productData = product.get({ plain: true }); 
        productData.recurrences.affectedStartTimes = productData.recurrences.affectedStartTimes.filter(item => item.checked);
        if(productData.times.length > 1){
           dailyListArray = [...dailyListArray, ...splitObjectsByTimes(productData)];
        }else{
           dailyListArray.push(productData)
        }
      }
      const total = dailyListArray.length;
      const totalPages = Math.ceil(total / limit);
  
      // Paginate the final split data
      const paginatedData = dailyListArray.slice(offset, offset + limit);
      return {
        total,
      totalPages,
      currentPage: page,
      products: paginatedData,
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  
module.exports = {
  getAllDailyDepartures
};