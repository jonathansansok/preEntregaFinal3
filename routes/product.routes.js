const express = require("express");
const productRouter = express.Router();
const upload = require("../middlewares/multer.middleware");
const productController = require("../controllers/product.controller");
const { mustLoggedIn } = require("../middlewares/authentication.middleware");

const {
  validarInputsProduct,
} = require("../middlewares/formsValidator.middleware");

productRouter.get("/", productController.list);

productRouter.get("/create", mustLoggedIn, productController.create);

productRouter.post(
  "/",
  mustLoggedIn,
  upload.single("thumbnail"),
  validarInputsProduct,
  productController.store
);

productRouter.get("/update/:id", productController.update);

productRouter.post(
  "/actualize/:id",
  mustLoggedIn,
  upload.single("thumbnail"),
  validarInputsProduct,
  productController.actualize
);

productRouter.post("/delete/:id", mustLoggedIn, productController.delete);

productRouter.get("/:id", productController.detail);
module.exports = productRouter;
