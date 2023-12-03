const chalk = require('chalk'); // Import the chalk library for colorful console output
const fs = require('fs');

// Function to get all notes
const getNotes = () => 'Your notes...';

// Function to add a new note
const addNote = (title, body) => {
    const notes = loadNotes(); // Load existing notes
    const duplicateNote = notes.find((note) => note.title === title); // Check for duplicate title

    if (!duplicateNote) {
        notes.push({ title: title, body: body }); // Add the new note
        saveNotes(notes); // Save the updated notes
        console.log(chalk.green('New note added'));
    } else {
        console.log(chalk.red('Note Title Taken!'));
    }
};

// Function to remove a note
const removeNote = (title) => {
    const notes = loadNotes(); // Load existing notes
    const removedNotes = notes.filter((note) => note.title === title); // Find notes to be removed
    const notesToKeep = notes.filter((note) => note.title !== title); // Filter out the note to be removed

    if (removedNotes.length === 0) {
        console.log(chalk.red('Note does not exist'));
    } else {
        saveNotes(notesToKeep); // Save the updated notes without the removed note
        console.log(chalk.green('Note removed'));
    }
};

// Function to list all notes
const listNotes = () => {
    const notes = loadNotes(); // Load existing notes
    console.log(chalk.blueBright('Your Notes: '));
    notes.forEach((note) => {
        console.log(note.title);
    });
};

// Function to read a specific note
const readNote = (title) => {
    const notes = loadNotes(); // Load existing notes
    const foundNote = notes.find((note) => note.title === title); // Find the requested note

    if (foundNote) {
        console.log(chalk.blue(foundNote.title + ': ') + foundNote.body);
    } else {
        console.log(chalk.red('Note does not exist'));
    }
};

// Function to load notes from the file
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json'); // Read data from the file
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON); // Parse the JSON data
    } catch (e) {
        return []; // Return an empty array if the file doesn't exist or there is an error
    }
};

// Function to save notes to the file
const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes); // Convert notes array to JSON string
    fs.writeFileSync('notes.json', dataJson); // Write the JSON data to the file
};

// Exporting functions to be used in other files
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
};
