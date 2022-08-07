const express = require("express");
const path = require("path");
const notesData = require("./db/db.json");

const PORT = process.env.PORT || 3000;
const app = express(); //  instantiate the server

// Sets up the Express app to handle data parsing
app.use(express.static("public")); // add middleware to specify the root ("public") directory to serve static files
app.use(express.urlencoded({ extended: true })); // parse incoming string or array data
app.use(express.json()); // parse incoming JSON data

// // get index.html file
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// }); // This is the route to the root of the server

// app.get("/notes", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/notes.html"));
// }); // This route goes to /notes

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// }); // any route that wasn't previously defined will fall under this request and will receive the homepage as the response

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

// *** FILTER BY QUERY app  end route ***
app.get("/api/db", (req, res) => {
  let results = notesData;
  console.log(req.query);
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

// *** FIND BY ID app end route ***
app.get("/api/db/:id", (req, res) => {
  const result = findById(req.params.id, notesData);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send({ error: "Note not found" });
  }
});

app.listen(PORT, () => {
  console.log(`API server now on port http://localhost:${PORT}`);
}); // tell server to listen for requests
