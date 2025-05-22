const express = require("express");
const userController = require("../../controller/userCtrl");

const userRouter = express.Router();


// register the user

userRouter.post("/auth/register", userController.register);

// login in the user
userRouter.post('/auth/login', userController.login)

// verify email
userRouter.post("/auth/verify-user", userController.verifyUser)

module.exports = userRouter