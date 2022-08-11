const fs = require("fs");
const path = require("path");

// *** READ ALL data in db.json  ***
function readAllData(body, notesArray) {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
    if (err) throw err;
    notesArray = data;
  });
  return notesArray;
}

// *** FILTER BY QUERY function definition ***
function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.title) {
    filteredResults = filteredResults.filter(
      (note) => note.title === query.title
    );
  }
  if (query.text) {
    filteredResults = filteredResults.filter(
      (note) => note.text === query.text
    );
  }
  if (query.id) {
    filteredResults = filteredResults.filter((note) => note.id === query.id);
  }
  return filteredResults;
}

// *** FIND BY ID function definition ***
function findById(id, notesArray) {
  const result = notesArray.filter((note) => note.id === id)[0];
  return result;
}

// *** CREATE NEW NOTE function definition ***
function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(notesArray, null, 2)
  );
  return note;
}

// *** VALIDATE NOTES function definition ***
function validateNote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  return true;
}

// *** UPDATE NOTES DATABASE function definition ***
function updateNotes(updatedNotesArray) {
  const notes = updatedNotesArray;
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(updatedNotesArray, null, 2)
  );
  return notes;
}

module.exports = {
  readAllData,
  filterByQuery,
  findById,
  createNewNote,
  validateNote,
  updateNotes,
};
