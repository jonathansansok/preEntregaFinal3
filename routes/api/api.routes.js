const express = require("express");
const cartRouter = require("./cart.routes");
const productRoutes = require("./products.routes");
const userApiRouter = require("./user.routes");
const apiRoutes = express.Router();

apiRoutes.use("/productos", productRoutes);
apiRoutes.use("/cart", cartRouter);
apiRoutes.use("/users", userApiRouter);

module.exports = apiRoutes;
