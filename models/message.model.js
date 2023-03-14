const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: { type: String, required: true },
    fechaYhora: { type: Date , default: new Date()},
    message: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
