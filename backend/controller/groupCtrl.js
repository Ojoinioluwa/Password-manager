const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { createSalt } = require("../utils/genSalt");
const Group = require("../models/Group");
const User = require("../models/User");
const AuthorizedGroup = require("../models/AuthorizedGroup");


// TODO: check for expiration of the group or the password

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
        const { groupId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            res.status(400);
            throw new Error("Invalid group ID");
        }

        // Delete the group only if it belongs to the current user (owner)
        const group = await Group.findOneAndDelete({ _id: groupId, ownerId: req.user.id });

        if (!group) {
            res.status(404);
            throw new Error("Group not found or unauthorized");
        }

        // Delete all AuthorizedGroup documents associated with this group
        await AuthorizedGroup.deleteMany({ groupId });

        res.status(200).json({
            message: "Group and associated data deleted successfully",
            group
        });
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

        if (userId.toString() === group.ownerId.toString()) {
            res.status(400)
            throw new Error("Group Owner can't remove himself")
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

        if (req.user.id.toString() === group.ownerId.toString()) {
            res.status(400)
            throw new Error("Group Owner can't remove himself")
        }

        group.members = group.members.filter(
            (member) => member.userId.toString() !== req.user.id.toString()
        );
        await group.save();

        res.status(200).json({ message: "You have left the group successfully" });
    }),

    authorizeGroup: asyncHandler(async (req, res) => {
        const { encryptedPassword, iv, expiresAt } = req.body;
        const { groupId, passwordId } = req.params

        const group = await Group.findOne({ _id: groupId, ownerId: req.user.id });

        if (!group) {
            res.status(404);
            throw new Error("Group does not exist or user is not authorized");
        }

        const members = group.members.filter((member) => member.authorized === true)

        const groupPassword = await AuthorizedGroup.create({
            encryptedPassword,
            expiresAt,
            iv,
            groupId: group._id,
            authorizedUsers: members,
            passwordId,
        })

        res.status(201).json({
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
    toggleAuthorizeUser: asyncHandler(async (req, res) => {
        const { groupId, userId } = req.params;

        const group = await Group.findOne({ _id: groupId, ownerId: req.user.id });
        if (!group) {
            res.status(404);
            throw new Error("Group not found or unauthorized");
        }

        // Find the member and toggle their authorization
        const member = group.members.find(member => member.userId.toString() === userId.toString());

        if (!member) {
            res.status(404);
            throw new Error("Member not found in the group");
        }

        member.authorized = !member.authorized;

        await group.save();

        res.status(200).json({
            message: "Member authorization toggled",
            memberId: userId,
            authorized: member.authorized,
        });
    }),

    toggleAuthorizeUserPerPassword: asyncHandler(async (req, res) => {
        const { groupId, authorizeGroupId, userId } = req.params

        if (!mongoose.Types.ObjectId.isValid(groupId) ||
            !mongoose.Types.ObjectId.isValid(authorizeGroupId) ||
            !mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400);
            throw new Error("Invalid  ID");
        }

        const group = await Group.findOne({ _id: groupId, ownerId: req.user.id });

        if (!group) {
            res.status(403)
            throw new Error("User not authorized to make changes to the group")
        }

        const groupPassword = await AuthorizedGroup.findById(authorizeGroupId);
        if (!groupPassword) {
            res.status(404)
            throw new Error("Group password does not exist")
        }

        const member = groupPassword.authorizedUsers.find((member) => member.userId.toString() === userId.toString());

        if (!member) {
            res.status(404)
            throw new Error("User does not exist")
        }
        member.authorized = !member.authorized;

        await groupPassword.save()

        res.status(200).json({
            message: "User authorization toggled",
            authorized: member.authorized,
        })

    }),

    getPasswordInfo: asyncHandler(async (req, res) => {
        const { groupId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            res.status(400);
            throw new Error("Invalid group ID");
        }

        const group = await Group.findById(groupId);
        if (!group) {
            res.status(404)
            throw new Error("Group does not exist")
        }

        const groupPasswords = await AuthorizedGroup.find({ groupId: group._id }).populate("authorizedUsers.userId", "firstName email");

        res.status(200).json({
            message: "Group info and passwords fetched successfully",
            group,
            groupPasswords
        })
    }),

}

module.exports = groupController;