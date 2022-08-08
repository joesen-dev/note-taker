const router = require("express").Router();
const {
  filterByQuery,
  findById,
  createNewNote,
  validateNote,
  updateNotes,
} = require("../../lib/notes");
let notesData = require("../../db/db.json");

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
  const { id } = req.params;

  const deleted = notesData.find((note) => note.id === id);
  if (deleted) {
    notesData = notesData.filter((note) => note.id !== id);
    updateNotes(notesData);
    res.json(deleted);
  } else {
    res.status(404).send({ error: "Note not found" });
  }
});

module.exports = router;
