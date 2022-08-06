const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express(); //  instantiate the server

// Sets up the Express app to handle data parsing
app.use(express.static("public")); // add middleware to specify the root ("public") directory to serve static files
app.use(express.urlencoded({ extended: true })); // parse incoming string or array data
app.use(express.json()); // parse incoming JSON data

// get index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
}); // This is the route to the root of the server

app.get("/index.js", (req, res) => {
  res.json("index.js");
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
}); // This route goes to /notes

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
}); // any route that wasn't previously defined will fall under this request and will receive the homepage as the response

app.listen(PORT, () => {
  console.log(`API server now on port http://localhost:${PORT}`);
}); // tell server to listen for requests
