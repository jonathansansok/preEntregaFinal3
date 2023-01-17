const { logger_info } = require("./../logger/log_config");
const UserModel = require("./../models/user.model");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const notificationService = require("../services/notifications.service");
const { default: file } = require("@babel/core/lib/transformation/file/file");

const userController = {
  dashboard: (req, res) => {
    logger_info.info(
      `Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" accedida`
    );

    const response = req.user;
    console.log(response);
    res.render("dashboard", response);
  },

  register: (req, res) => {
    logger_info.info(
      `Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" accedida`
    );

    const response = {
      error: req.query.error,
      msg: req.query.msg,
    };
    res.render("register", response);
  },

  signUp: async (req, res) => {
    logger_info.info(
      `Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" accedida`
    );
    console.table(req.body);
    //console.table(req.file);
    const { username, email, password } = req.body;
    try {
      let user = await UserModel.findOne({ username });
      if (user) res.redirect("/register?error=true&msg=Username ya registrado");

      const hashPassword = await bcrypt.hash(password, 12);

      user = await UserModel.create({
        username,
        email,
        password: hashPassword,
        thumbnail: req.file ? req.file.filename: "default.png", 
      
      });
      await notificationService.notifyByEmailUser(user);
      await notificationService.notifyByWhatsApp(user);
      res.redirect("/");
    } catch (error) {
      console.log(error);
      // remove file from server
      if (file && file.filename){
        fs.unlink(
          // elimina el archivo de imagen si surge un problema en el registro
          path.join(__dirname, "../", "assets", "images", req.file.filename),
          (err) => {
            if (err) console.log(err);
          }
        );
      
      }

      res.redirect("/register?error=true&msg=Error en el registro");
    }
  },

  login: (req, res) => {
    logger_info.info(
      `Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" accedida`
    );

    const response = {
      error: req.query.error,
    };
    res.render("login", response);
  },

  logout: (req, res, next) => {
    logger_info.info(
      `Ruta ${req.method} - "${req.hostname}:${req.socket.localPort}${req.baseUrl}" accedida`
    );

    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
};

module.exports = userController;
