const productServices = require("../services/product.service");

const validarInputsProduct = (req, res, next) => {
  console.table(req.body);
  const { title, price } = req.body;
  if (title && title !== "" && price && price !== "" && !isNaN(price)) {
    next();
  } else {
    res.status(400).json({ status: "ERROR", result: "Datos inválidos" });
  }
};

module.exports = { validarInputsProduct };
