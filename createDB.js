// Globals
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.

// Initialize table.
// If the table already exists, causes an error.
// Fix the error by removing or renaming Flashcards.db

//CREATE TABLE flashcards (user INT, english TEXT, korean TEXT, seen INT, correct INT )
const cmdStr = 'CREATE TABLE Flashcards (user INT, english TEXT, chinese TEXT, seen INT, correct INT, score INT)'
db.run(cmdStr,tableCreationCallback);
const cmdStr2 = 'CREATE TABLE Users (firstName TEXT, lastName TEXT, GoogleID INT )'//first name, last name, and Google ID
db.run(cmdStr2,tableCreationCallback2);

// Always use the callback for database operations and print out any
// error messages you get.
// This database stuff is hard to debug, give yourself a fighting chance.
function tableCreationCallback(err) {
    if (err) {
	console.log("Table creation error",err);
    } else {
	console.log("Database created");
    }
}

function tableCreationCallback2(err) {
    if (err) {
        console.log("Table2 creation error",err);
    } else {
        console.log("Database2 created");
        db.close();
    }
}
