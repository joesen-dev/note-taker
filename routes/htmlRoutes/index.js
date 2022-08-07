const path = require("path");
const router = require("express").Router();

// get index.html file
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
}); // Route to the root of the server

router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/notes.html"));
}); // Route goes to /notes

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
}); // any route that wasn't previously defined will fall under this request and will receive the homepage as the response

module.exports = router;
