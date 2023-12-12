/**
 * @file initDB.js
 * Initializes the counter in the database.
 * This script sets up a counter used for generating unique ticket numbers in the application.
 */

const Counter = require("../models/Counter");

/**
 * Initializes the counter with a starting sequence number if it doesn't already exist.
 */
async function initializeCounter() {
    const counterId = "ticketId";
    const startSeq = 499;

    let counter = await Counter.findById(counterId);

    if (!counter) {
        counter = new Counter({ _id: counterId, seq: startSeq });
        await counter.save();
        console.log("Counter initialized with seq:", counter.seq);
    }
}

module.exports = initializeCounter;
