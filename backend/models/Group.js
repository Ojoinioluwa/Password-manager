const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    salt: {
        type: String,
        required: true,
        unique: true
    },
    members: [{userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"}}],
    iv: {
        type: string,
    },
    expiresAt: {
        type: Date
    }
}, {timestamps: true})