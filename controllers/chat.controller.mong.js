const userModel = require("../models/user.model");
const chatModel = require("../models/chat.model");

const chatController = {
  chat: (req, res) => {
    const username = req.user.username;
    console.log("username", username);
    res.render("chat", { username });
  },
  create: async (req, res) => {
    const id = req.params.id;
    const asunto = req.query.asunto;
    const user = await userModel.findById(id);
    const chat = await chatModel.create({
      user: user,
      asunto: asunto,
    });
    console.log(chat);
    res.send("chat", { user });
  },
};
module.exports = chatController;
