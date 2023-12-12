/**
 * @file Counter.js
 * Defines the schema for the Counter model using Mongoose.
 * Used to maintain a sequential counter for ticket numbering.
 */

const mongoose = require("mongoose");

/**
 * Schema definition for a counter.
 */
const counterSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    seq: {
        type: Number,
    },
});

/**
 * Exports the Counter model, which is based on the counterSchema.
 */
module.exports = mongoose.model("Counter", counterSchema);
