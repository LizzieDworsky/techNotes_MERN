/**
 * @file Note.js
 * Defines the schema for the Note model using Mongoose.
 * Represents a note in the system with various attributes.
 */

const mongoose = require("mongoose");

/**
 * Schema definition for a note.
 */
const noteSchema = new mongoose.Schema(
    {
        ticket: {
            type: Number,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

/**
 * Exports the Note model, which is based on the noteSchema.
 */
module.exports = mongoose.model("Note", noteSchema);
