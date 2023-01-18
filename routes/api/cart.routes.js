const { Router } = require("express");
const CartController = require("./../../controllers/api/cart.controller.mongo");

const cartRouter = Router();

cartRouter.get("/:id", CartController.getMyCart);
cartRouter.post("/:id", CartController.addToCart);

module.exports = cartRouter;
