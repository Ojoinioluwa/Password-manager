const express = require("express");
const isAuthenticated = require("../../middlewares/isAuth");
const authorizedUserController = require("../../controller/authorizedUserCtrl");

const authorizedUserRouter = express.Router();

// add an authorized user
authorizedUserRouter.post("/authorize/user/:passwordId", isAuthenticated, authorizedUserController.addAuthorizedUser);


// get authorizedUsers
authorizedUserRouter.get("/authorize/user", isAuthenticated, authorizedUserController.getAuthorizedUsers);

// deleteAuthorizedUser
authorizedUserRouter.delete("/authorize/user/:authorizedId/delete", isAuthenticated, authorizedUserController.deleteAuthorizedUser);

// editAuthorizedUser
authorizedUserRouter.put("/authorize/user/:authorizedId/edit", isAuthenticated, authorizedUserController.editAuthorizedUser);

// editAuthorizedUser
authorizedUserRouter.put("/authorize/user/:authorizedId/toggleAuthorize", isAuthenticated, authorizedUserController.toggleAuthorizedUser);

// get authorized PASSWORDS
authorizedUserRouter.get("/authorize/passwords", isAuthenticated, authorizedUserController.getAllAuthorizedPasswords);



module.exports = authorizedUserRouter

