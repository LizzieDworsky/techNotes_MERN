/**
 * @file root.js
 * Root route for the application.
 * Serves the main index.html page.
 */

const express = require("express");
const router = express.Router();
const path = require("path");

/**
 * GET route for the root and index.html.
 * Serves the main HTML page of the application.
 */
router.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
