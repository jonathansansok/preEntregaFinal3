const userModel = require("../models/user.model");
const chatModel = require("../models/chat.model");

const chatController = {
  chat: (req, res) => {
    const username = req.query.username
    const userId = req.query.userId
    chatId  = req.params.chatId
    res.render("chat", {
      username,
      userId,
      chatId,
    });
  },
  create: async (req, res) => {
    const id = req.params.id;
    const asunto = req.query.asunto;
    const user = await userModel.findById(id);
    const chat = await chatModel.create({
      userOwner: user,
      asunto: asunto,
    });
    res.redirect(
      "/chat/" + chat.id + "?username=" + user.username + "&userId=" + id
    );
  },
};
module.exports = chatController;
