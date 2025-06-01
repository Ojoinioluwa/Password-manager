const express = require("express");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Password = require("../models/Password");
const validator = require("validator")

const passwordController = {
    addPassword: asyncHandler(async (req, res) => {
        const { title, email, url, notes, encryptedPassword, iv, category } = req.body
        if (!title || !url || !encryptedPassword || !iv) {
            res.status(400)
            throw new Error("Fill in all required fields")
        }
        if (url && !validator.isURL(url)) {
            res.status(400)
            throw new Error("Enter a valid url")
        }

        if (email && !validator.isEmail(email)) {
            res.status(400)
            throw new Error("Enter a valid Email")
        }

        await Password.create({
            title,
            encryptedPassword,
            notes,
            url,
            email,
            iv,
            userId: req.user.id,
            category: category ? category.toUpperCase() : "OTHERS"

        })

        res.status(200).json({
            message: "Password Stored Successfully",
        })
    }),
    getAllPasswords: asyncHandler(async (req, res) => {
        const passwords = await Password.find({ userId: req.user.id }).lean()

        if (passwords.length === 0) {
            res.status(200).json({
                message: "There is no password. add password"
            })
            return;
        }

        res.status(200).json({
            message: "Fetched all users password successfully",
            passwords
        })
    }),
    getPasswordById: asyncHandler(async (req, res) => {
        const { passwordId } = req.params
        const password = await Password.findOne({ _id: passwordId, userId: req.user.id }).lean();
        if (!password) {
            res.status(404)
            throw new Error("Password does not exist");
        }
        res.status(200).json({
            message: "Fetched password info successfully",
            password
        })
    }),
    updatePassword: asyncHandler(async (req, res) => {
        const { passwordId } = req.params;
        const { encryptedPassword, iv } = req.body
        const password = await Password.findOne({ _id: passwordId, userId: req.user.id })
        if (!password) {
            res.status(404)
            throw new Error("Password not found or you are not authorized to update it");
        }

        if (encryptedPassword) password.encryptedPassword = encryptedPassword;
        if (iv) password.iv = iv;

        await password.save();

        res.status(200).json({
            message: "Password info updated successfully"
        })

    }),
    deletePassword: asyncHandler(async (req, res) => {
        const { passwordId } = req.params;
        const password = await Password.findOneAndDelete({ _id: passwordId, userId: req.user.id });
        if (!password) {
            res.status(400)
            throw new Error("Password not found or you are not authorized to delete it")
        }
        res.status(200).json({
            message: "Password deleted Successfully"
        })
    }),
}

module.exports = passwordController