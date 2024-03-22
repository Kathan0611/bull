const express = require("express");
const userRouter = express.Router();
const UserController = require('../Controller.js/userController');
const authController = require('../Controller.js/authController');

userRouter.route('/signup').post(authController.signup);
userRouter.route('/login').post(authController.login);
userRouter.route('/forgot').post(authController.forgotPassword);

userRouter.get('/me',authController.protect,UserController.getMe,UserController.getUser);
userRouter.
route("/").get(UserController.getAllUsers).post(UserController.createUser);

userRouter.
route("/:id")
.get(UserController.getUser)
.patch(UserController.updateUser)
.delete(UserController.deleteUser);

module.exports = userRouter;
