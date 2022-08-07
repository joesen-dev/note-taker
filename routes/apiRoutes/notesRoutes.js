const router = require("express").Router();
const { filterByQuery, findById } = require("../../lib/notes");
const notesData = require("../../db/db.json");

// *** FILTER BY QUERY app end route ***
router.get("/db", (req, res) => {
  let results = notesData;
  console.log(req.query);
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

// *** FIND BY ID app end route ***
router.get("/db/:id", (req, res) => {
  const result = findById(req.params.id, notesData);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send({ error: "Note not found" });
  }
});

module.exports = router;
