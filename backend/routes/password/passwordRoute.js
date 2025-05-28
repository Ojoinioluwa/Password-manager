const express = require("express");
const passwordController = require("../../controller/passwordCtrl");
const isAuthenticated = require("../../middlewares/isAuth");
const breachController = require("../../controller/breachCtrl");

const passwordRouter = express.Router();

passwordRouter.post("/vault/addPassword", isAuthenticated, passwordController.addPassword)




// +++++++++++++check for breaches in both email and companies+++++++++++++++++++

passwordRouter.post("/vault/checkEmailBreach",  breachController.checkBreachEMail)
passwordRouter.post("/vault/checkCompanyBreach", isAuthenticated, breachController.checkIfCompanyBreached)

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



module.exports = passwordRouter