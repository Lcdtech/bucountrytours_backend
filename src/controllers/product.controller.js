const productService = require('../services/product.service.js');

const createProduct = async (req, res) => {
  try {
    const productData = req.body;  
    const newProduct = await productService.createProduct(productData);  
    return res.status(201).json({
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating product',
      error: error.message
    });
  }
};
const updateProduct = async (req, res) => {
    try {
      const productId = req.params.id; 
      const productData = req.body;    
      const updatedProduct = await productService.updateProduct(productId, productData);
  
      if (!updatedProduct) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }
  
      return res.status(200).json({
        message: 'Product updated successfully',
        data: updatedProduct,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating product',
        error: error.message,
      });
    }
};
const getProductById = async (req, res) => {
    try {
      const productId = req.params.id;  
  
      const product = await productService.getProductById(productId);
  
      if (!product) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }
  
      return res.status(200).json({
        message: 'Product fetched successfully',
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching product',
        error: error.message,
      });
    }
  };

  const getAllProducts = async (req, res) => {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
  
      const products = await productService.getAllProducts(page, limit, search); 
  
      return res.status(200).json({
        message: 'Products fetched successfully',
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching products',
        error: error.message,
      });
    }
  };
  
  
  const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params; 
      const deletedProduct = await productService.deleteProduct(id);
  
      if (!deletedProduct) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }
  
      return res.status(200).json({
        message: 'Product deleted successfully',
        data: deletedProduct,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error deleting product',
        error: error.message,
      });
    }
  };
module.exports = {
  createProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  deleteProduct
};
