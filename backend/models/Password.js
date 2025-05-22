const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    notes: {
        type: String,
        required: false
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    iv: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)


module.exports = mongoose.model("Password", passwordSchema)