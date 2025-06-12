const mongoose = require("mongoose");

const authorizedUserSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    authorizedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
    },
    iv: {
        type: String,
        required: true
    },
    authorized: {
        type: Boolean,
        required: true,
        default: true
    },
    passwordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Password",
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model("AuthorizedUser", authorizedUserSchema)