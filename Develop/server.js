const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express(); //  instantiate the server

app.get("/api/notes", (req, res) => {
  res.send("Hello!"); // use for small files
}); // add the route

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
}); // tell server to listen for requests
