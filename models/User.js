/**
 * @file User.js
 * Defines the schema for the User model using Mongoose.
 * Represents a user in the system with various attributes.
 */

const mongoose = require("mongoose");

/**
 * Schema definition for a user.
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [
        {
            type: String,
            default: "Employee",
        },
    ],
    active: {
        type: Boolean,
        default: true,
    },
});

/**
 * Exports the User model, which is based on the userSchema.
 */
module.exports = mongoose.model("User", userSchema);
