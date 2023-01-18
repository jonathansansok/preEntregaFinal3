const mongoose = require("mongoose");
const UserModel = require("./../../models/user.model");
const CartModel = require("./../../models/cart.model");
const ProductModel = require("./../../models/product.model");

async function obtenerCarritoPorIdUsuarioOCrearlo(userId) {
  const user = await UserModel.findById(userId);
  const cart = await CartModel.find({ user: user }).populate("products");
  if (cart[0]) {
    return cart[0];
  } else {
    const carrito = new CartModel({ user: user });
    await carrito.save();
    return carrito;
  }
}
const CartController = {
  getMyCart: async (req, res) => {
    const id = req.params.id;
    const cart = await obtenerCarritoPorIdUsuarioOCrearlo(id);
    res.status(200).json({ message: "carrito actual", cart: cart });
  },

  addToCart: async (req, res) => {
    try {
      const idUser = req.params.id;
      const idProduct = req.body.idProduct;
      const cart = await obtenerCarritoPorIdUsuarioOCrearlo(idUser);
      const product = await ProductModel.findById(idProduct);

      cart.products.push(product);
      cart.subTotal += product.price;
      await cart.save();

      res.status(200).json({ message: "producto agregado", cart: cart });
    } catch (err) {
      console.log("no se pudo agregar al carrito", err);
      res.status(500).json({ message: "no se pudo agregar al carrito" });
    }
  },
};

module.exports = CartController;
