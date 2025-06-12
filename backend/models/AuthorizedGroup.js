const mongoose = require("mongoose");

const authorizedGroupSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
    },
    // TODO: check if this is still needed for the current logic
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