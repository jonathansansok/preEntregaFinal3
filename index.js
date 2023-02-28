const app = require('./app');

const http = require('http');

const server = http.createServer(app);
//////////
const yargs = require("yargs");
yargs.version("1.0.0");

let modo = yargs.argv.modo || "fork";

yargs.parse();
///////////
const { Server } = require("socket.io");
const io = new Server(server); 

let mensajes = [{email: "bienvenida@chat.com", msg: "Bienvenido al chat", date: "01/01/2021 00:00:00"}];


io.on("connection", (socket) => {
    console.log("Se ha conectado un cliente");
    socket.emit('new-message', mensajes);
//    socket.emit('new-product', constructor.getAll());
    socket.on('new-message', (data) => {
      console.log(data);
      mensajes.push(data);
      io.sockets.emit('new-message', mensajes);
      fs.writeFile('./mensajes.txt', JSON.stringify(mensajes), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    });
    socket.on('new-product', async (data) => {
     await constructor.save(data);
     const productos = await constructor.getAll();
      io.sockets.emit('new-product', productos);
    });
  });
  let PORT = yargs.argv.port || process.env.PORT || 8080;
  server.listen(PORT, () =>
  console.log(`Server up on port ${PORT}, process id=${process.pid}`)
);


  
  
  
