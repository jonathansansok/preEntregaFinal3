const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    thumbnail: { type: String, required: true, unique: false },
    title: { type: String, required: true, unique: true },
    price: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
