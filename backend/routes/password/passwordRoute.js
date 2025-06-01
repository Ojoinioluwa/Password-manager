const express = require("express");
const passwordController = require("../../controller/passwordCtrl");
const isAuthenticated = require("../../middlewares/isAuth");
const breachController = require("../../controller/breachCtrl");

const passwordRouter = express.Router();

// Add passwords
passwordRouter.post("/vault/addPassword", isAuthenticated, passwordController.addPassword)

// get all passwords
passwordRouter.get("/vault/getAllPasswords", isAuthenticated, passwordController.getAllPasswords)

// get password by id
passwordRouter.get("/vault/getPassword/:passwordId", isAuthenticated, passwordController.getPasswordById)

// update password
passwordRouter.put("/vault/updatePassword/:passwordId", isAuthenticated, passwordController.updatePassword)

// delete password
passwordRouter.delete("/vault/deletePassword/:passwordId", isAuthenticated, passwordController.deletePassword)





// +++++++++++++check for breaches in both email and companies+++++++++++++++++++

passwordRouter.post("/vault/checkEmailBreach", breachController.checkBreachEMail)

passwordRouter.post("/vault/checkCompanyBreach", isAuthenticated, breachController.checkIfCompanyBreached)

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



module.exports = passwordRouter