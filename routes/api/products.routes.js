const express = require("express");
const productController = require("../../controllers/api/product.controller");
const productServices = require("../../services/product.service");
const productRoutes = express.Router();

productRoutes.get("/", productController.getAllProducts);
productRoutes.post("/", productController.createProduct);

productRoutes.put("/:id", productController.updateProduct);

productRoutes.delete("/:id", productController.deleteProduct);

productRoutes.get("/:id", productController.getProducyById);

module.exports = productRoutes;
