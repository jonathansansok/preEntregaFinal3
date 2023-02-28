const productServices = require("./../services/product.service");
const { logger_info, logger_error } = require("./../logger/log_config");
const fs = require("fs");

const productController = {
  list: async (req, res) => {
    logger_info.info(
      `Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" accedida`
    );
    products = await productServices.getAllProducts();
    res.render("productos", { products });
  },
  create: (req, res) => {
    logger_info.info(
      `Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" accedida`
    );
    res.render("productForm");
  },

  detail: async (req, res) => {
    logger_info.info(
      `Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" accedida`
    );
    try {
      const { id } = req.params;
      const product = await productServices.getProductById(id);

      res.render("productoDetalle", { product });
    } catch (error) {
      logger_error.error(
        `Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" error: ${error.message}`
      );
      res.redirect("/products?error=Producto no encontrado");
    }
  },

  store: async (req, res) => {
    logger_info.info(
      `Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" accedida`
    );
    try {
      const { filename } = req.file;
      const { title, price } = req.body;
      console.table(req.file);
      const producto = await productServices.createProduct({
        title: req.body.title,
        price: req.body.price,
        thumbnail: filename,
      });
      res.redirect("/products");
    } catch (error) {
      logger_error.error(
        `Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" error: ${error.message}`
      );
      if (fs.existsSync(`./assets/images/${req.file.filename}`)) {
        fs.unlinkSync(`./assets/images/${req.file.filename}`);
      }
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    logger_info.info(
      `Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" accedida`
    );
    try {
      const { id } = req.params;
      console.log(req.body)
      console.log(req.file)

      const product = await productServices.getProductById(id);
      console.log(product);
      res.render("productoUpdate", { product });
    } catch (error) {
      logger_error.error(
        `Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" error: ${error.message}`
      );
      res.render("productoUpdate", { error: error.message });
    }
  },

  actualize: async (req, res) => {
    logger_info.info(
      `Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" accedida`
    );

    try {
      const { id } = req.params;
      const { title, price } = req.body;
      // si se actualiza la imagen hay q armar una logica para eliminar la imnagen anterior y guardar la nueva...
      await productServices.updateProduct(id, {
        title,
        price,
        thumbnail: req.file.filename,
      });
      res.redirect("/products");
    } catch (error) {
      logger_error.error(
        `Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" error: ${error.message}`
      );
      res.status(400).json({ status: "ERROR", result: error.message });
    }
  },

  delete: async (req, res) => {
    logger_info.info(
      `Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" accedida`
    );
    try {
      const { id } = req.params;
      const producto = await productServices.deleteProduct(id);
      console.log(`producto ${producto} eliminado`);
      res.redirect("/products");
    } catch (error) {
      logger_error.error(
        `Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" error: ${error.message}`
      );
      res.status(400).json({ status: "ERROR", result: error.message });
    }
  },
};

module.exports = productController;
