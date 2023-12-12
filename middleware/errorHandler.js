/**
 * @file errorHandler.js
 * Custom error handling middleware for the application.
 * It logs the error details and sends a response with the error message.
 */

const { logEvents } = require("./logger");

/**
 * Error handling middleware.
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function in the stack.
 */
const errorHandler = (err, req, res, next) => {
    logEvents(
        `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
        "errLog.log"
    );
    console.log(err.stack);
    const status = res.statusCode ? res.statusCode : 500;
    res.status(status);
    res.json({ message: err.message });
};
module.exports = errorHandler;
