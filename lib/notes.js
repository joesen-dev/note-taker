const fs = require("fs");
const path = require("path");

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
  console.log(result);
  return result;
}

module = {
  filterByQuery,
  findById,
};
