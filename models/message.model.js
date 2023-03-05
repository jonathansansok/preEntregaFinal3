const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: { type: String, required: true },
    fechaYhora: { type: Date },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
