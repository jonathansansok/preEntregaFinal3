const ProductModel = require("../models/product.model");

const productServices = {
  getAllProducts: async () => {
    const products = await ProductModel.find();
    return products;
  },

  getProductById: async (id) => {
    const product = await ProductModel.findById(id);
    return product;
  },

  createProduct: async (product) => {
    const newProduct = await ProductModel.create(product);
    return newProduct;
  },

  updateProduct: async (id, product) => {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, product, {
      new: false,
    });
    return updatedProduct;
  },

  deleteProduct: async (id) => {
    const deletedProduct = await ProductModel.findById(id);
    await ProductModel.findByIdAndDelete(id);
    console.log(id);
    console.log(deletedProduct);
    return deletedProduct;
  },
};

module.exports = productServices;
