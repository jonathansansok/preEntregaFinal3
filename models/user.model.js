const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    thumbnail: { type: String, default: "default.png" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
