const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - firstName
 *          - lastName
 *          - email
 *          - password
 *          - phoneNumber
 *          - verified
 *          - salt
 *          - wrongTrials
 *        properties: 
 *          firstName:
 *              type: string
 *          lastName: 
 *              type: string
 *          email: 
 *              type: string
 *              format: email
 *          password: 
 *              type: string
 *              format: password
 *          phoneNumber: 
 *              type: string
 *          verified:
 *              type: boolean
 *          salt: 
 *              type: string
 *          wrongTrials:
 *              type: number
 *          lockUntil:
 *              type: string
 *              format: date-time
 *          
 *         
 * 
 */

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    wrongTrials: {
        type: Number,
        required: true,
        default: 0
    },
    lockUntil: {
        type: Date,
    },
    salt: {
        type: String,
        required: true,
        unique: true
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model("User", userSchema)