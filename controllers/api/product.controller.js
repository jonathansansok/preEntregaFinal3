const productServices = require("./../../services/product.service");

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await productServices.getAllProducts();
      res.json({ statusCode: 200, data: products, message: "OK" });
    } catch (err) {
      res
        .status(401)
        .json({ statusCode: 401, message: "Error " + err.message });
    }
  },

  getProducyById: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await productServices.getProductById(id);
      res.json({ statusCode: 200, data: product, message: "OK" });
    } catch (err) {
      res
        .status(401)
        .json({ statusCode: 401, message: "Error " + err.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const { title, price } = req.body;
      if (title != "" && price != "" && !isNaN(price)) {
        const product = await productServices.createProduct({
          title,
          price,
          thumbnail: "imagen",
        });
        res.status(201).json({
          statusCode: 201,
          data: product,
          message: "Product created successfully",
        });
      } else {
        res.status(400).json({
          statusCode: 400,
          message: "Invalid  parameters",
        });
      }
    } catch (err) {
      res
        .status(401)
        .json({ statusCode: 401, message: "Error " + err.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;

      const { title, price } = req.body;
      if (title != "" && price != "" && !isNaN(price)) {
        const updatedProduct = await productServices.updateProduct(id, {
          title,
          price,
        });

        res.status(200).json({
          statusCode: 200,
          data: updatedProduct,
          message: "Product modified successfully",
        });
      } else {
        res.status(400).json({
          statusCode: 400,
          message: "Invalid  id",
        });
      }
    } catch (err) {
      res
        .status(401)
        .json({ statusCode: 401, message: "Error " + err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const deleteProduct = await productServices.deleteProduct(id);
      res.status(200).json({
        statusCode: 200,
        data: deleteProduct,
        message: "Product borrado bien",
      });
    } catch (err) {
      res.status(401).json({
        statusCode: 401,
        message: "pusiste mal el id para borrar " + err.message,
      });
    }
  },
};

module.exports = productController;
