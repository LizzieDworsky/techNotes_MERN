/**
 * @file usersController.js
 * Controller functions for handling user-related operations in the application.
 * Includes functions for getting all users, creating a new user, updating a user, and deleting a user.
 */

const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

/**
 * @desc Get all users
 * Retrieves all users from the database, excluding their password for security.
 * @route GET /users
 * @access Private
 */
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").lean();
    if (!users?.length) {
        return res.status(400).json({ message: "No users found." });
    }
    return res.json(users);
});

/**
 * @desc Create new user
 * Creates a new user with a hashed password and specified roles.
 * Checks for duplicate usernames before creation.
 * @route POST /users
 * @access Private
 */
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "All fields are required." });
    }
    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userObject = { username, password: hashedPassword, roles };
    const user = await User.create(userObject);
    if (user) {
        return res
            .status(201)
            .json({ message: `New user ${username} created.` });
    } else {
        return res.status(400).json({ message: "Invalid user data recieved." });
    }
});

/**
 * @desc Update user
 * Updates a user's details based on provided data.
 * Allows updating username, roles, active status, and password.
 * Checks for username duplication and validates user existence before updating.
 * @route PATCH /users
 * @access Private
 */
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body;
    if (
        !id ||
        !username ||
        !Array.isArray(roles) ||
        !roles.length ||
        typeof active !== "boolean"
    ) {
        return res.status(400).json({ message: "All fields are required." });
    }
    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(400).json({ message: "User not found." });
    }
    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: "Duplicate username." });
    }
    user.username = username;
    user.roles = roles;
    user.active = active;
    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await user.save();
    return res.json({ message: `${updatedUser.username} updated.` });
});

/**
 * @desc Delete user
 * Deletes a user based on the provided ID.
 * Checks for any notes assigned to the user before deletion.
 * @route DELETE /users
 * @access Private
 */
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "User ID Required." });
    }
    const note = await Note.findOne({ user: id }).lean().exec();
    if (note) {
        return res.status(400).json({ message: "User has assigned notes." });
    }
    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(400).json({ message: "User not found." });
    }
    const result = await User.findOneAndDelete({ _id: id }).exec();
    const reply = `Username ${result.username} with ID ${result._id} deleted.`;
    return res.json(reply);
});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
};
