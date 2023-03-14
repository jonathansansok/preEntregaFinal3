const mongoose = require("mongoose");


const chatSchema = mongoose.Schema(
  {
    userOwner: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required:true 
    },
    messages: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Message", 
        default: [] 
      },
    ],
    asunto: { type: String },
    estaSolucionado: { type: Boolean, default: false},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
