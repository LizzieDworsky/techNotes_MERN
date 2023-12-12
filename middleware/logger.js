/**
 * @file logger.js
 * Custom logging middleware and functions for the application.
 * It logs request and general events to log files.
 */

const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

/**
 * Logs events to a specified log file.
 * @param {string} message - The message to log.
 * @param {string} logFileName - The file name of the log.
 */
const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
        }
        await fsPromises.appendFile(
            path.join(__dirname, "..", "logs", logFileName),
            logItem
        );
    } catch (error) {
        console.log("Error in logEvents", error);
    }
};

/**
 * Middleware that logs each request to a log file.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function in the stack.
 */
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
    console.log(`${req.method} ${req.path}`);
    next();
};

module.exports = { logEvents, logger };
