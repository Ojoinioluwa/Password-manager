const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { createSalt } = require("../utils/genSalt");
const Group = require("../models/Group");
const User = require("../models/User");


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
            ownerId: req.user.id,
            members: [{ userId: req.user.id, authorized: true }]
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

        if (description !== undefined) group.description = description;
        if (name !== undefined) group.name = name;
        if (expiresAt !== undefined) group.expiresAt = expiresAt
        if (type !== undefined) group.type = type;

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
    getgroupsUser: asyncHandler(async (req, res) => {
        const groups = await Group.find({
            members: {
                $elemMatch: {
                    userId: req.user.id,
                    authorized: true
                }
            },
            authorized: true
        }).populate("members.userId", "firstName email lastName").lean()

        res.status(200).json({
            message: "fetched groups successfully",
            groups
        })
    }),
    addMember: asyncHandler(async (req, res) => {
        const { email } = req.body;
        const { groupId } = req.params;

        const group = await Group.findOne({ ownerId: req.user.id, _id: groupId });

        if (!group) {
            res.status(404)
            throw new Error("Group does not exist or not authorized to add members")
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404)
            throw new Error("User does not exist")
        }

        const alreadyMember = group.members.some(m => m.userId.toString() === user._id.toString());
        if (alreadyMember) {
            res.status(400);
            throw new Error("User is already a member of the group");
        }


        group.members.push({ userId: user._id })

        await group.save();

        res.status(200).json({
            message: "User added to the group successfully"
        })
    }),
    removeMember: asyncHandler(async (req, res) => {
        const { groupId, userId } = req.params;

        const group = await Group.findOne({ _id: groupId, ownerId: req.user.id });

        if (!group) {
            res.status(404)
            throw new Error("Group does not exist or user does not have authority to modify the group")
        }


        const isMember = group.members.some(
            m => m.userId.toString() === userId
        );
        if (!isMember) {
            res.status(400);
            throw new Error("That user is not a member of this group");
        }

        group.members = group.members.filter(
            m => m.userId.toString() !== userId
        );
        await group.save();

        res.status(200).json({ message: "User removed from group successfully" });


    }),

    leaveGroup: asyncHandler(async (req, res) => {
        const { groupId } = req.params;

        const group = await Group.findOne({
            _id: groupId,
            members: {
                $elemMatch: {
                    userId: req.user.id
                }
            }
        });

        if (!group) {
            res.status(404);
            throw new Error("Group not found or user is not a member");
        }

        group.members = group.members.filter(
            (member) => member.userId.toString() !== req.user.id.toString()
        );
        await group.save();

        res.status(200).json({ message: "You have left the group successfully" });
    }),

    authorizeGroup: asyncHandler(async (req, res) => {
        const { encryptedPassword, iv } = req.body;
        const { groupId } = req.params

        const group = await Group.findOne({ _id: groupId, ownerId: req.user.id });

        if (!group) {
            res.status(404);
            throw new Error("Group does not exist or user is not authorized");
        }

        if (encryptedPassword !== undefined) group.encryptedPassword = encryptedPassword;
        if (iv !== undefined) group.iv = iv;

        await group.save()


        res.status(200).json({
            message: "group authorized successfully"
        })



    }),
    toggleAuthorizeGroup: asyncHandler(async (req, res) => {
        const { groupId } = req.params;
        const group = await Group.findOne({ _id: groupId, ownerId: req.user.id });

        if (!group) {
            res.status(404);
            throw new Error("Group does not exist or user is not authorized");
        }

        group.authorized = !group.authorized;

        await group.save()

        res.status(200).json({
            message: "successfully toggled group authorization"
        })
    }),





}

module.exports = groupController;