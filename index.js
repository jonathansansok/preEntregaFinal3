const app = require('./app');

const http = require('http');

const server = http.createServer(app);
//////////
const yargs = require("yargs");
yargs.version("1.0.0");

//let modo = yargs.argv.modo || "fork";

yargs.parse(); 
///////////
const { Server } = require("socket.io");
const io = new Server(server); 

let mensajes = [{email: "bienvenida@chat.com", msg: "Bienvenido al chat", date: "01/01/2021 00:00:00"}];

io.on('connection', socket => {
  console.log('a user was connected')
  socket.on('chat message', (msg) => {
      console.log(`message: ${msg}`)
      io.emit('chat message', msg)
  })
  socket.on('disconnect', () => {
      console.log('user was disconnected')
    })
})
   
  let PORT = process.env.PORT || 8080;
  server.listen(PORT, () =>
  console.log(`Server up on port ${PORT}, process id=${process.pid}`)
);


  
  
  
