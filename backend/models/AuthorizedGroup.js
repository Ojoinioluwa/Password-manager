const mongoose = require("mongoose");

const authorizedGroupSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    },
    encryptedPassword: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Password",
        required: true
    },
    expiresAt: {
        type: Date,
    },
    authorizedUsers: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
    authorized: {
        type: Boolean,
        required: true,
        default: true
    },
    iv: {
        type: String,
    },
    passwordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Password",
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model("AuthorizedGroup", authorizedGroupSchema)