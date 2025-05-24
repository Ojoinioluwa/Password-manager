const mongoose = require("mongoose");

const authorizedSchema = new mongoose.Schema({
    authorizedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { _id: false });

const passwordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    notes: {
        type: String
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    iv: {
        type: String,
        required: true
    },
    category: {
        type: string,
        required: true,
        enum: 
        [
            "SOCIAL",
            "BANKING",
            "EMAIL",
            "WORK",
            "ENTERTAINMENT",
            "UTILITIES",
            "SHOPPING",
            "OTHERS"
        ],
        default: "OTHERS"
    },
  authorized: [authorizedSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model("Password", passwordSchema);