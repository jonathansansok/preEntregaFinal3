require("dotenv").config();

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBSession = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cluster = require("cluster");
const core = require("os");
const compression = require("compression");
//const contenedor = new Container("products.json");
///////  LOGGER///////////////
const { logger_warn } = require("./logger/log_config");
/////INSTANCIA PARA CARGAR PRODUCTOS

///////////// Rutas User, Info, Random y Products, Cart //////////////
const userRoutes = require("./routes/user.routes");
const apiRoutes = require("./routes/api/api.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
////////////////////////////////////////////////

///////////// YARGS //////////////
const yargs = require("yargs");
yargs.version("1.0.0");

let PORT = yargs.argv.port || process.env.PORT || 8080;
let modo = yargs.argv.modo || "fork";

yargs.parse();
//////////////////////////////////

const app = express();

///////////////// Sesión MONGO DB //////////////////////////////
const store = new MongoDBSession({
  uri: process.env.mongo_URI,
  collection: "mySessions",
});
//////////////////////////////////////////////////////////////////

app.set("views", "./views");
app.set("view engine", "ejs");

//////// Static Files ////////
app.use("/assets", express.static("assets"));

//////// Middlewares ////////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    key: process.env.SESSION_KEY,
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 hora
  })
);

//////// Compression ////////
app.use(compression());
/////////////////////////////

//////// Passport ////////
require("./strategies/local");
app.use(passport.initialize());
app.use(passport.session());

////////////////////////////////////////////////////////////////////////////////////////////
//crear RUTAS DEL ECOMMERCE productos y  carritos. Y CREAR LAS VISTAS EN EJS PARA ecommerce y carrito
//estilos y agregar una pagina cque tenga formulario para agregar productos /crear post.productos
app.use(userRoutes);
app.use("/api", apiRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
// Cuando no existe la ruta
app.get("/*", (req, res) => {
  logger_warn.error(
    `Ruta ${req.method} - "${req.baseUrl}${req.url}" no encontrada`
  );
  res.status(404).send(`
  <h1>ERROR 404</h1>
  <p>Ruta ${req.method} - "${req.baseUrl}${req.url}" no encontrada</p>`);
});

////////////////////////////////////////////////////////////
app.listen(PORT, () =>
    console.log(`Server up on port ${PORT}, process id=${process.pid}`)
  );
/* 
if (cluster.isPrimary) {
  if (modo !== "fork") {
    for (let i = 0; i < core.cpus().length; i++) {
      cluster.fork();
    }

    // reemplazar workers en caso de que mueran
    cluster.on("exit", () => cluster.fork());
  } else {
    cluster.fork();
  }
} else {
  mongoose
    .connect(process.env.mongo_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("Base de datos conectada!!"))
    .catch((err) => console.log("Error al conectar la base de datos!!"));

  app.listen(PORT, () =>
    console.log(`Server up on port ${PORT}, process id=${process.pid}`)
  );
}
 */