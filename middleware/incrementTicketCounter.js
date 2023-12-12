/**
 * @file incrementTicketCounter.js
 * Middleware to increment the ticket counter in the database.
 * This is used to assign a unique sequential ticket number to each note.
 */

const Counter = require("../models/Counter");

/**
 * Middleware function to increment the ticket counter.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function in the stack.
 */
async function incrementTicketCounter(req, res, next) {
    try {
        const counter = await Counter.findByIdAndUpdate(
            { _id: "ticketId" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        req.ticketNumber = counter.seq;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = incrementTicketCounter;
