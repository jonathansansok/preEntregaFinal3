const express = require('express');
const productRoutes = require('./products.routes');
const apiRoutes = express.Router();

apiRoutes.use("/productos", productRoutes
 )

 module.exports = apiRoutes;
