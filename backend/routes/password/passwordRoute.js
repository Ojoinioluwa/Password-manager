const express = require("express");
const passwordController = require("../../controller/passwordCtrl");
const isAuthenticated = require("../../middlewares/isAuth");

const passwordRouter = express.Router();

passwordRouter.post("/vault/addPassword", isAuthenticated, passwordController.addPassword)




module.exports = passwordRouter