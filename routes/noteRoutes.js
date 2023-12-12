/**
 * @file noteRoutes.js
 * Routes for handling note-related operations.
 * Includes routes for getting, creating, updating, and deleting notes.
 */

const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");
const incrementTicketCounter = require("../middleware/incrementTicketCounter");

/**
 * Route serving note-related requests.
 * GET for retrieving all notes,
 * POST for creating a new note (with ticket counter increment),
 * PATCH for updating a note,
 * DELETE for deleting a note.
 */
router
    .route("/")
    .get(notesController.getAllNotes)
    .post(incrementTicketCounter, notesController.createNewNote)
    .patch(notesController.updateNote)
    .delete(notesController.deleteNote);

module.exports = router;
