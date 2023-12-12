require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const initializeCounter = require("./config/initDB");
const PORT = process.env.PORT || 3500;

/**
 * Connect to the database.
 */
connectDB();
/**
 * Middleware for logging request details.
 */
app.use(logger);
/**
 * Enable Cross-Origin Resource Sharing (CORS) with predefined options.
 */
app.use(cors(corsOptions));
/**
 * Middleware to parse JSON request bodies.
 */
app.use(express.json());
/**
 * Middleware to parse cookies attached to the client request object.
 */
app.use(cookieParser());
/**
 * Serve static files located in the 'public' directory.
 */
app.use("/", express.static(path.join(__dirname, "public")));
/**
 * Root route.
 */
app.use("/", require("./routes/root"));
/**
 * User routes.
 */
app.use("/users", require("./routes/userRoutes"));
/**
 * Note routes.
 */
app.use("/notes", require("./routes/noteRoutes"));
/**
 * Catch-all route handler for any requests to an undefined route.
 */
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});
/**
 * Global error handler middleware.
 */
app.use(errorHandler);
/**
 * Event listener for the 'open' event on the mongoose connection.
 * Starts the server once the database connection is established.
 */
mongoose.connection.once("open", async () => {
    console.log("Connected to MongoDB");
    try {
        await initializeCounter();
        console.log("Counter initialized.");
    } catch (error) {
        console.log("Error initializing counter", error);
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
/**
 * Event listener for the 'error' event on the mongoose connection.
 * Logs the database connection errors.
 */
mongoose.connection.on("error", (err) => {
    console.log(err);
    logEvents(
        `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
        "mongoErrLog.log"
    );
});
