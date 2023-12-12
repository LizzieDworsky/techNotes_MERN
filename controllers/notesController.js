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
    const note = await Note.create({
        user,
        title,
        text,
        ticket: req.ticketNumber,
    });
    if (note) {
        return res
            .status(201)
            .json({ message: `New note for ${userObj.username} created.` });
    } else {
        return res.status(400).json({ message: "Invalid note data recieved" });
    }
});

/*
@desc Update note
@route PATCH /notes
@access Private
*/
const updateNote = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body;
    if (!id) {
        return res.status(400).json({ message: "ID is required." });
    }
    if (!user && !title && !text && typeof completed !== "boolean") {
        return res.status(400).json({ message: "No fields to update." });
    }
    const note = await Note.findById(id).exec();
    if (!note) {
        return res.status(400).json({ message: "Note not found." });
    }
    let resultObj = { message: "Fields updated." };
    if (user) {
        const userObj = await User.findById(user).lean().exec();
        if (!userObj) {
            return res.status(400).json({ message: "User not found." });
        }
        note.user = user;
        resultObj.username = userObj.username;
    }
    updateField(note, resultObj, "title", title);
    updateField(note, resultObj, "text", text);
    updateField(note, resultObj, "completed", completed);
    await note.save();
    return res.json(resultObj);
});

const updateField = asyncHandler(
    async (note, resultObj, fieldName, fieldValue) => {
        if (typeof fieldValue !== "undefined" && fieldValue !== null) {
            note[fieldName] = fieldValue;
            resultObj[fieldName] = fieldValue;
        }
    }
);

/*
@desc Delete note
@route DELETE /note
@access Private
*/
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "Note ID required." });
    }
    const note = await Note.findById(id).exec();
    if (!note) {
        return res.status(400).json({ message: "Note not found." });
    }
    const result = await Note.findOneAndDelete({ _id: id }).exec();
    return res.json({ message: `Note ${result.title} was deleted.` });
});

module.exports = { getAllNotes, createNewNote, updateNote, deleteNote };
