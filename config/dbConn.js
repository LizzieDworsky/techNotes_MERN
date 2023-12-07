const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (error) {
        console.log("Error in connectDB", error);
    }
};

module.exports = connectDB;
