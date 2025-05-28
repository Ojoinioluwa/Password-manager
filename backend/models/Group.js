const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    salt: {
        type: String,
        required: true,
        unique: true
    },
    members: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            authorized: { type: Boolean, required: true, default: true }
        }
    ],
    iv: {
        type: String,
    },
    expiresAt: {
        type: Date
    },
    type: {
        type: String,
        enum: [
            "family",
            "friends",
            "school",
            "coworkers",
            "community",
            "gaming",
            "study",
            "project",
            "support",
            "others"
        ],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // image: {
    //     type: String,
    //     required: true
    // }
}, { timestamps: true });

module.exports = mongoose.model("Group", groupSchema);
