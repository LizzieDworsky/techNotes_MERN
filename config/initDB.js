const Counter = require("../models/Counter");

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
