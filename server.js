// Dependencies - npm packages needed ----------------------------------
const express = require('express');
const path = require('path');
const fs = require('fs');

const crypto = require('crypto');

// Setting up Express server configuration
// Creating the "express" server for node
const app = express();

// Setting an initial PORT for the Listener
const PORT = process.env.PORT || 8080;

// Setting up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes ----------------------------------------------------------

// Using a promise to read the JSON
// Routing the db.json to store / read notes using fs module

function getSavedNotes() {
    return savedNotes = fs.readFile('./db/db.json', 'utf8');
};

// Creating route GET to read the db.json and return saved notes as JSON
app.get('/api/notes', (req, res) => {
    getSavedNotes().then((savedNotes) => {
        res.send(JSON.parse(savedNotes))
    }).catch((err) => res.status().json(err));
});

// Creating route POST to receive a new note and add it to the db.json
// Giving each note a unique id when it's saved to the db.json
// Returning the new note to the client on the front-end
app.post('/api/notes', (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let id = crypto.randomBytes().toString();
    let createsNewNote = {
        title: req.body.title,
        text: req.body.text,
        id: id,
    };
    savedNotes.push(createsNewNote);

    // Writing the notes to the db.json using fs module
});



// Creating route DELETE to receive a query parameter with the note id
// Reading saved notes from db.json, removing a note with the given id

// Rewriting the notes to the db.json using fs module


// HTML routes ---------------------------------------------------------

// Creating route GET to return the notes.html file - front-end
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Creating route GET to return the index.html file - front-end
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Starting the server by setting up the Listener ----------------------
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});

// End of program script