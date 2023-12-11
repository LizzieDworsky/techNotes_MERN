const Note = require("../models/Note");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

/*
@desc Get all notes
@route GET /notes
@access Private
*/
const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find().lean();
    if (!notes?.length) {
        return res.status(400).json({ message: "No notes found." });
    }
    return res.json(notes);
});

/*
@desc Create new note
@route POST /notes
@access Private
*/
const createNewNote = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body;
    if (!user || !title || !text) {
        return res.status(400).json({ message: "All fields are required." });
    }
    const userObj = await User.findById(user).lean().exec();
    if (!userObj) {
        return res.status(400).json({ message: "User not found." });
    }
    const note = await Note.create({ user, title, text });
    console.log(note);
    if (note) {
        return res
            .status(201)
            .json({ message: `New note for ${user.username} created.` });
    } else {
        return res.status(400).json({ message: "Invalid note data recieved" });
    }
});

/*
@desc Update note
@route PATCH /notes
@access Private
*/
const updateNote = asyncHandler(async (req, res) => {});

/*
@desc Delete note
@route DELETE /note
@access Private
*/
const deleteNote = asyncHandler(async (req, res) => {});

module.exports = { getAllNotes, createNewNote, updateNote, deleteNote };
