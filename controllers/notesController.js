const Note = require("../models/Note");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

/*
@desc Get all notes
@route GET /notes
@access Private
*/
const getAllNotes = asyncHandler(async (req, res) => {});

/*
@desc Create new note
@route POST /notes
@access Private
*/
const createNewNote = asyncHandler(async (req, res) => {});

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
