const { Router } = require("express");
const CartController = require("../controllers/api/cart.controller.mongo");

const cartRouter = Router();


cartRouter.get("/:id", CartController.getMyCart
); 

module.exports= cartRouter;