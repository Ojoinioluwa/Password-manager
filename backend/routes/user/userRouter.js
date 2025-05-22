const express = require("express");
const userController = require("../../controller/userCtrl");
const authLimiter = require("../../middlewares/authLimiter");

// instantiate the user router
const userRouter = express.Router();


// register the user
userRouter.post("/auth/register", userController.register);

// login in the user
userRouter.post('/auth/login', authLimiter, userController.login)

// verify email
userRouter.post("/auth/verify-user", userController.verifyUser)

// get users profile
userRouter.post("/getuserProfile", userController.getUserProfile)

module.exports = userRouter