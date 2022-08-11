const router = require("express").Router();
const {
  readAllData,
  filterByQuery,
  findById,
  createNewNote,
  validateNote,
  updateNotes,
} = require("../../lib/notes");
const notesData = require("../../db/db.json");

// import uuid to create a unique ID
const { v4: uuidv4 } = require("uuid");

// *** FILTER BY QUERY app end route ***
router.get("/notes", (req, res) => {
  let results = notesData;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

// *** FIND BY ID app end route ***
router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notesData);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send({ error: "Note not found" });
  }
});

// *** CREATE NEW NOTE && VALIDATE NOTES app end route ***
router.post("/notes", (req, res) => {
  //add a unique id
  var createNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  // if any data in req.body is incorrect, send 400 error back
  if (!validateNote(req.body)) {
    res.status(400).send({ error: "The note is not properly formatted" });
  } else {
    createNewNote(createNote, notesData);
    res.json(req.body);
  }
});

// *** DELETE NOTE app end route ***
router.delete("/notes/:id", (req, res) => {
  const result = readAllData(req.params.id, notesData);
  var deleteNote = req.params.id;
  const deleted = result.find((note) => note.id === deleteNote);
  if (deleted) {
    newNotesData = result.filter((note) => note.id !== deleteNote);
    updateNotes(newNotesData);
    res.json(deleted);
  } else {
    res.status(404).send({ error: "Note not found" });
  }
});

module.exports = router;
