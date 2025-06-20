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

        if (!email) {
            res.status(400);
            throw new Error("Email is required");
        }
        if (!iv || !encryptedPassword) {
            res.status(400);
            throw new Error("Please ensure you encrypt the password")
        }

        const user = await User.findOne({ email }).select("_id email");
        if (!user) {
            res.status(404)
            throw new Error("User does not exist. Cannot authorize a user who is not a participant on this site.")
        }
        const owner = await User.findById(req.user.id).select("email");
        if (!owner) {
            res.status(404)
            throw new Error("You don't exist in the database. try again")
        }

        if (owner.email === email) {
            res.status(403);
            throw new Error("User can not Authorize him self")
        }


        const existing = await AuthorizedUser.findOne({ authorizedId: user._id, ownerId: req.user.id, passwordId });
        if (existing) {
            res.status(409)
            throw new Error("User already authorized for this password.");
        }


        const authorizedUser = await AuthorizedUser.create({
            authorizedId: user._id,
            expiresAt: expiresAt ? new Date(expiresAt) : null,
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
        }).populate("authorizedId", "firstName email").populate("passwordId", "title").lean();
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
    }),

    getAllAuthorizedPasswords: asyncHandler(async (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
            return res.status(400).json({
                message: "Invalid User id"
            })
        }

        const authorizedPasswords = await AuthorizedUser.find({
            authorizedId: req.user.id,
            authorized: true,
            $or: [
                { expiresAt: { $gte: new Date() } }, // not expired
                { expiresAt: { $exists: false } },   // field is missing
                { expiresAt: null }                  // field is explicitly null
            ]
        }).populate("passwordId", "title url notes email category").populate("ownerId", "firstName lastName email").populate("authorizedId", "salt").lean()
        console.log(authorizedPasswords)


        if (!authorizedPasswords.length) {
            return res.status(200).json({
                message: "No authorized passwords found",
                authorizedPasswords: []
            });
        }


        res.status(200).json({
            message: "all Authorized passwords fetched",
            authorizedPasswords,
            passwords: authorizedPasswords.map((password => {
                return {
                    _id: password.passwordId._id,
                    category: password.passwordId.category,
                    email: password.passwordId.email,
                    url: password.passwordId.url,
                    title: password.passwordId.title,
                    notes: password.passwordId.notes,
                    userSalt: password.authorizedId.salt,
                    userId: password.authorizedId._id,
                    passwordIv: password.iv,
                    encryptedPassword: password.encryptedPassword,
                    passwordId: password.passwordId._id,

                }
            }))
        })
    })


}

module.exports = authorizedUserController