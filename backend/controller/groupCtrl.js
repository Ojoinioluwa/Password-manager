const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");


const groupController = {
    createGroup: asyncHandler(async(req,res)=> {}),
    updateGroup: asyncHandler(async(req,res)=> {}),
    deleteGroup: asyncHandler(async(req,res)=> {})
}

module.exports = groupController;