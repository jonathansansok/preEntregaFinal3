const {
  mustLoggedOut,
  mustLoggedIn,
} = require("../middlewares/authentication.middleware");
const { Router } = require("express");
const userController = require("../controllers/user.controller");
const passport = require("passport");
const upload = require("./../middlewares/multer.middleware");

const userRouter = Router();

userRouter.get("/", mustLoggedIn, userController.dashboard);

userRouter.get("/register", mustLoggedOut, userController.register);

userRouter.post("/register", upload.single("thumbnail"), userController.signUp);

userRouter.get("/login", mustLoggedOut, userController.login);

userRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?error=true",
  })
);

userRouter.get("/logout", mustLoggedIn, userController.logout);

module.exports = userRouter;
