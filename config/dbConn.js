/**
 * @file dbConn.js
 * Manages the connection to the MongoDB database.
 * It uses mongoose to connect to the specified database URI.
 */

const mongoose = require("mongoose");

/**
 * Connects to the MongoDB database.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (error) {
        console.log("Error in connectDB", error);
    }
};

module.exports = connectDB;
