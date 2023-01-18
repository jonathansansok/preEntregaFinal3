const { Router } = require("express");
const userController = require("../../controllers/api/user.controller");

const userApiRouter = Router();

userApiRouter.get("/", userController.getAllUsers);

module.exports = userApiRouter;
