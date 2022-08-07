const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express(); //  instantiate the server
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true })); // parse incoming string or array data
app.use(express.json()); // parse incoming JSON data
app.use(express.static("public")); // add middleware to specify the root ("public") directory to serve static files

// Use apiRoutes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port http://localhost:${PORT}`);
}); // tell server to listen for requests
