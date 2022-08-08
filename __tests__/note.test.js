const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewNote,
  validateNote,
  updateNotes,
} = require("../lib/notes");
let notesData = require("../db/db.json");

jest.mock("fs");

test("Creates a notes object", () => {
  const note = createNewNote({
    title: "Create a Server",
    text: "Create an Express Server",
    id: "1",
  });

  expect(note.title).toBe("Create a Server");
  expect(note.text).toBe("Create an Express Server");
  expect(note.id).toBe("1");
});

test("filters by query", () => {
  const startingNotes = [
    {
      title: "Title",
      text: "Text",
      id: "0",
    },
    {
      title: "Create a Server",
      text: "Create an Express Server",
      id: "1",
    },
  ];

  const updatedNotes = filterByQuery(
    { text: "Create an Express Server" },
    startingNotes
  );

  expect(updatedNotes.length).toEqual(1);
});

test("finds by id", () => {
  const startingNotes = [
    {
      title: "Title",
      text: "Text",
      id: "0",
    },
    {
      title: "Create a Server",
      text: "Create an Express Server",
      id: "1",
    },
  ];

  const result = findById("1", startingNotes);

  expect(result.title).toBe("Create a Server");
});

test("validates note formatting", () => {
  const note = {
    title: "Heroku",
    text: "Deploy my server to Heroku",
    id: "2",
  };

  const invalidNote = {
    title: 2,
    text: 5435,
  };

  const result = validateNote(note);
  const result2 = validateNote(invalidNote);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
