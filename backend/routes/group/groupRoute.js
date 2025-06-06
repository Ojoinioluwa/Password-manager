const express = require("express");
const isAuthenticated = require("../../middlewares/isAuth");
const groupController = require("../../controller/groupCtrl");

const groupRouter = express.Router();

// Create a group
groupRouter.post("/group/create", isAuthenticated, groupController.createGroup);

// Update group by ID
groupRouter.put("/group/:groupId/update", isAuthenticated, groupController.updateGroup);

// Delete group by ID
groupRouter.delete("/group/:groupId/delete", isAuthenticated, groupController.deleteGroup);

// Get groups for the current user
groupRouter.get("/group/getGroups", isAuthenticated, groupController.getgroupsUser);

// Add a member to group
groupRouter.post("/group/:groupId/member", isAuthenticated, groupController.addMember);

// Remove a member from group
groupRouter.delete("/group/:groupId/member/:userId/remove", isAuthenticated, groupController.removeMember);

// Leave a group (current user)
groupRouter.post("/group/:groupId/leave", isAuthenticated, groupController.leaveGroup);

// Authorize group (create password)
groupRouter.post("/group/:groupId/authorize/:passwordId", isAuthenticated, groupController.authorizeGroup);

// Toggle group authorization (enable/disable)
groupRouter.put("/group/:groupId/toggleAuthorize", isAuthenticated, groupController.toggleAuthorizeGroup);

// Toggle authorization status of a member in a group
groupRouter.put("/group/:groupId/toggleAuthorizeUser/:userId", isAuthenticated, groupController.toggleAuthorizeUser);

// Toggle authorization of user per password entry
groupRouter.put("/group/:groupId/authorizeGroup/:authorizeGroupId/toggleAuthorizeUser/:userId", isAuthenticated, groupController.toggleAuthorizeUserPerPassword);

// Get group password info
groupRouter.get("/group/:groupId/passwordInfo", isAuthenticated, groupController.getPasswordInfo);

module.exports = groupRouter;
