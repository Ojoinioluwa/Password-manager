const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const AuthorizedUser = require("../models/AuthorizedUser");


const authorizedUserController = {

    // add
    addAuthorizedUser: asyncHandler(async(req,res)=> {
        const {expiresAt, encryptedPassword, iv, authorizedId} = req.body
         if(!iv || !encryptedPassword){
            return res.status(400).json({
                message: "Please ensure you encrypt the password"
            })
         }
         if(!authorizedId){
            return res.status(400).json({
                message: "Ensure that you select a user to authorize"
            })
         }

         const authorizedUser =  await AuthorizedUser.create({
            authorizedId,
            expiresAt,
            encryptedPassword,
            iv,
            ownerId: req.user.id,

         })

         res.status(201).json({
            message: "Authorized User successfully"
         })
    }),
    
    // get
    getAuthorizedUsers: asyncHandler(async(req,res)=> {
        const authorizedUsers = await AuthorizedUser.find({
            ownerId: req.user.id
        }).lean();
        res.status(200).json({
            message: "Authorized users fetched successfully"
        })
    }),


    // delete
    deleteAuthorizedUser: asyncHandler(async(req,res)=> {
        const {authorizedId} = req.params
        const deletedAuthorizedUser = await AuthorizedUser.findByIdAndDelete({ownerId: req.user.id, _id:authorizedId }).lean();

        res.status(200).json({
            message: "Authorized user removed successfully",
            deletedAuthorizedUser
        })
    }),
    
    // edit
    editAuthorizedUser: asyncHandler(async(req,res)=> {
         const {authorizedId} = req.params
        const authorizedUser = await AuthorizedUser.findOne({ownerId: req.user.id, _id:authorizedId });

        res.status(200).json({
            message: "Authorized user info updated successfully"
        })
    }),
    toggleAuthorizedUser: asyncHandler(async(req,res)=> {
        const {authorizedId} = req.params
        const authorizedUser = await AuthorizedUser.findOne({ownerId: req.user.id, _id:authorizedId });

        if(authorizedUser){
            authorizedUser.authorized = !authorizedUser.authorized;
        }

        await authorizedUser.save();

        res.status(200).json({
            message: "User status changed successfully"
        })
    })
}

module.exports = authorizedUserController