const app = require("./app");
const mongoose = require("mongoose");
const http = require("http");
const server = http.createServer(app);
const chatModel = require("./models/chat.model");
const messageModel = require("./models/message.model");
const yargs = require("yargs");

yargs.version("1.0.0");
//let modo = yargs.argv.modo || "fork";
yargs.parse();


const { Server } = require("socket.io");
const { ChatGrant } = require("twilio/lib/jwt/AccessToken");
const io = new Server(server);

let mensajes = [
  {
    email: "bienvenida@chat.com",
    msg: "Bienvenido al chat",
    date: "01/01/2021 00:00:00",
  },
];

io.on("connection", (socket) => {
  
  console.log("a user was connected");
  socket.on("chat message", (msg) => {
    console.log(`message: ${msg}`);

   agregarMessageToChat(msg.chatId, msg.mensaje, msg.userId)
   .then(() => {
    console.log('mensaje archivado');
   }) 
   
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user was disconnected");
  });
});

const agregarMessageToChat = async(chatId, messageText, senderId) => {
  const chat = await chatModel.findById(chatId);
  const message = await messageModel.create({
    sender: senderId,
    message: messageText
  })

  chat.messages.push(message)
  await chat.save();

}

let PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server up on port ${PORT}, process id=${process.pid}`);
  mongoose
    .connect(process.env.mongo_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("Base de datos conectada!!"))
    .catch((err) => console.log("Error al conectar la base de datos!!"));
});
