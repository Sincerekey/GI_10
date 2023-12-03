const chalk = require('chalk'); // Import the chalk library for colorful console output
const yargs = require('yargs'); // Import yargs for command-line parsing
const noteUtilities = require('./notes'); // Import the custom note utility functions
const validator = require('validator'); // Import the validator library for input validation

// Customizing yargs version
yargs.version('1.1.0');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Adding new note',
    builder: {
        title: {
            describe: 'Note Title:',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note text',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        noteUtilities.addNote(argv.title, argv.body); // Call the addNote function with provided arguments
    },
});

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Removing note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        noteUtilities.removeNote(argv.title); // Call the removeNote function with the provided title
    },
});

// Create list command
yargs.command({
    command: 'list',
    describe: 'Listing all notes',
    handler(argv) {
        noteUtilities.listNotes(argv); // Call the listNotes function with provided arguments
    },
});

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        noteUtilities.readNote(argv.title); // Call the readNote function with the provided title
    },
});

// add, remove, read, list 
yargs.parse();
