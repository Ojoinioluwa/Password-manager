const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const AuthorizedUser = require("../models/AuthorizedUser");
const User = require("../models/User");


const authorizedUserController = {

    // add
    addAuthorizedUser: asyncHandler(async (req, res) => {
        const { expiresAt, encryptedPassword, iv, email } = req.body
        const { passwordId } = req.params
        if (!mongoose.Types.ObjectId.isValid(passwordId)) {
            res.status(400);
            throw new Error("Invalid password ID");
        }

        const user = await User.findOne({ email }).select("_id");
        if (!user) {
            res.status(404)
            throw new Error("User does not exist. Cannot authorize a user who is not a participant on this site.")
        }

        if (!iv || !encryptedPassword) {
            res.status(400);
            throw new Error("Please ensure you encrypt the password")
        }

        const existing = await AuthorizedUser.findOne({ authorizedId: user._id, ownerId: req.user.id, passwordId });
        if (existing) {
            res.status(409)
            throw new Error("User already authorized for this password.");
        }


        const authorizedUser = await AuthorizedUser.create({
            authorizedId: user._id,
            expiresAt,
            encryptedPassword,
            iv,
            ownerId: req.user.id,
            passwordId

        })

        res.status(201).json({
            message: "Authorized User created successfully",
            authorizedUserId: authorizedUser._id,
        });

    }),

    // get
    getAuthorizedUsers: asyncHandler(async (req, res) => {
        const authorizedUsers = await AuthorizedUser.find({
            ownerId: req.user.id
        }).lean();
        res.status(200).json({
            message: "Authorized users fetched successfully",
            authorizedUsers
        })
    }),

    // delete
    deleteAuthorizedUser: asyncHandler(async (req, res) => {
        const { authorizedId } = req.params
        if (!mongoose.Types.ObjectId.isValid(authorizedId)) {
            res.status(400);
            throw new Error("Invalid authorized user ID");
        }

        const deletedAuthorizedUser = await AuthorizedUser.findOneAndDelete({ ownerId: req.user.id, _id: authorizedId }).lean();

        if (!deletedAuthorizedUser) {
            res.status(404);
            throw new Error("Authorized user not found or unauthorized");
        }

        res.status(200).json({
            message: "Authorized user removed successfully",
            deletedAuthorizedUser
        })
    }),
    // edit
    editAuthorizedUser: asyncHandler(async (req, res) => {
        const { expiresAt } = req.body
        const { authorizedId } = req.params
        if (!mongoose.Types.ObjectId.isValid(authorizedId)) {
            res.status(400);
            throw new Error("Invalid authorized user ID");
        }

        const authorizedUser = await AuthorizedUser.findOne({ ownerId: req.user.id, _id: authorizedId });

        if (!authorizedUser) {
            res.status(404)
            throw new Error("Authorized user not found or unauthorized");
        }
        if (expiresAt) {
            const date = new Date(expiresAt);
            if (isNaN(date.getTime())) {
                res.status(400);
                throw new Error("Invalid expiration date");
            }
            authorizedUser.expiresAt = date;
        }

        await authorizedUser.save()
        res.status(200).json({
            message: "Authorized user info updated successfully"
        })
    }),
    toggleAuthorizedUser: asyncHandler(async (req, res) => {
        const { authorizedId } = req.params
        if (!mongoose.Types.ObjectId.isValid(authorizedId)) {
            res.status(400);
            throw new Error("Invalid authorized user ID");
        }

        const authorizedUser = await AuthorizedUser.findOne({ ownerId: req.user.id, _id: authorizedId });

        if (!authorizedUser) {
            res.status(404);
            throw new Error("Authorized user not found or unauthorized");
        }

        authorizedUser.authorized = !authorizedUser.authorized;
        await authorizedUser.save();

        res.status(200).json({
            message: "User status changed successfully",
            authorized: authorizedUser.authorized
        });
    })
}

module.exports = authorizedUserController