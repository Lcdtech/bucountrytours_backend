const { Product } = require('../models'); 
const { Op } = require('sequelize'); // Ensure you have this import if not already

const createProduct = async (productData) => {
  try {
    const result = await Product.create(productData);
    return result; 
  } catch (error) {
    console.error("Error creating product:", error);
    throw error; 
  }
};
const updateProduct = async (id, updateData) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }

    await product.update(updateData);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

  const getProductById = async (productId) => {
    try {
      const product = await Product.findByPk(productId);
  
      if (!product) {
        return null;
      }
      return product;  
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  };
  const getAllProducts = async (page, limit, search) => {
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
  
      return {
        total: products.count,
        totalPages: Math.ceil(products.count / limit),
        currentPage: page,
        products: products.rows,
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
  const deleteProduct = async (id) => {
    try {
      const product = await Product.findByPk(id); 
  
      if (!product) {
        return null; 
      }
  
      await product.update({ status: false }, {
        where: { id }
      }); 
      return product; 
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error; 
    }
  };
module.exports = {
  createProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  deleteProduct
};