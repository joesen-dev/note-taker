const router = require("express").Router();
const {
  filterByQuery,
  findById,
  createNewNote,
  validateNote,
  updateNotes,
} = require("../../lib/notes");
const notesData = require("../../db/db.json");

// import uuid to create a unique ID
const uuid = require("uuid");
const uniqueId = uuid.v4();

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
  req.body.id = uniqueId; //add a unique id

  // if any data in req.body is incorrect, send 400 error back
  if (!validateNote(req.body)) {
    res.status(400).send({ error: "The note is not properly formatted" });
  } else {
    const note = createNewNote(req.body, notesData);
    res.json(req.body);
  }
});

// *** DELETE NOTE app end route ***
router.delete("/notes/:id", (req, res) => {
  var deleteNote = req.params.id;
  const deleted = notesData.find((note) => note.id === deleteNote);
  if (deleted) {
    newNotesData = notesData.filter((note) => note.id !== deleteNote);
    updateNotes(newNotesData);
    res.json(deleted);
  } else {
    res.status(404).send({ error: "Note not found" });
  }
});

module.exports = router;
