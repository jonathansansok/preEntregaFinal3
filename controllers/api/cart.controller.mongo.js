const CartModel = require("./../../models/cart.model");

const CartController = {
  getMyCart: async (req, res) => {
    const id = req.params.id;
    let result = await CartModel.find({ user: mongoose.ObjectId(id) });
    if (result) {
      res.send(result);
    } else {
      const newCart = await CartModel.create({ user: mongoose.ObjectId(id) });
      res.send(newCart);
    }
  },
};

module.exports = CartController;
