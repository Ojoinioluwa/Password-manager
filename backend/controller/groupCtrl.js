const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { createSalt } = require("../utils/genSalt");
const Group = require("../models/Group");


const groupController = {
    createGroup: asyncHandler(async (req, res) => {
        const { description, name, expiresAt, type } = req.body;
        const groupSalt = createSalt();

        if (!description || !name || !type) {
            res.status(400)
            throw new Error("Fill in all required Fields")
        }


        const group = await Group.create({
            description,
            name,
            salt: groupSalt,
            expiresAt,
            type,
            ownerId: req.user.id
        });


        res.status(201).json({
            message: "Group created Succesfully",
            group
        })
    }),
    updateGroup: asyncHandler(async (req, res) => {
        const { description, name, expiresAt, type } = req.body;
        const { groupId } = req.params

        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            res.status(400);
            throw new Error("Invalid group ID");
        }


        const group = await Group.findOne({ _id: groupId, ownerId: req.user.id });

        if (!group) {
            res.status(404)
            throw new Error("Group does not exist")
        }

        if (description) group.description = description;
        if (name) group.name = name;
        if (expiresAt) group.expiresAt = expiresAt
        if (type) group.type = type;

        await group.save();
        res.status(200).json({
            message: "Group updated Successfully",
            group
        })
    }),
    deleteGroup: asyncHandler(async (req, res) => {
        const { groupId } = req.params

        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            res.status(400);
            throw new Error("Invalid group ID");
        }


        const group = await Group.findOneAndDelete({ _id: groupId, ownerId: req.user.id });
        if (!group) {
            res.status(404);
            throw new Error("Group not found or unauthorized");
        }

        res.status(200).json({
            message: "Group deleted Successfully",
            group
        })

    }),
    getAuthorizedPassword: asyncHandler(async (req, res) => { }),
    getGroupMembers: asyncHandler(async (req, res) => { }),
}

module.exports = groupController;