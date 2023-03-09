const app = require('./app');
const mongoose = require("mongoose");
const http = require('http');
const server = http.createServer(app);
//////////
const yargs = require("yargs");
yargs.version("1.0.0");

//let modo = yargs.argv.modo || "fork";

yargs.parse(); 
///////////
const { Server } = require("socket.io");
const chatModel = require('./models/chat.model');
const io = new Server(server); 

let mensajes = [{email: "bienvenida@chat.com", msg: "Bienvenido al chat", date: "01/01/2021 00:00:00"}];

io.on('connection', socket => {
  console.log('a user was connected')
  socket.on('chat message', (msg) => {
      chatModel.findByIdAndUpdate(msg.chatId, {messages.push(msg.message)})
      .then( () => {
        console.log('mensaje guardado')

      })
      .catch( (err) => {
        console.log('Fallo al guardar mensaje')



      })
      console.log(`message: ${msg}`)
      io.emit('chat message', msg)
  })
  socket.on('disconnect', () => {
      console.log('user was disconnected')
    })
})
   
  let PORT = process.env.PORT || 8080;
  server.listen(PORT, () => {
    console.log(`Server up on port ${PORT}, process id=${process.pid}`)
    mongoose
  .connect(process.env.mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Base de datos conectada!!"))
  .catch((err) => console.log("Error al conectar la base de datos!!"));
  }
);


  
  
  
