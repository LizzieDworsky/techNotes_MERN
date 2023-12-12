const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");
const incrementTicketCounter = require("../middleware/incrementTicketCounter");

router
    .route("/")
    .get(notesController.getAllNotes)
    .post(incrementTicketCounter, notesController.createNewNote)
    .patch(notesController.updateNote)
    .delete(notesController.deleteNote);

module.exports = router;
