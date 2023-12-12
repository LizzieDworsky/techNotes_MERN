const Counter = require("../models/Counter");

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
