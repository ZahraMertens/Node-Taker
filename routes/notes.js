const notesRouter = require("express").Router();
const { v4: uuidv4 } = require('uuid'); //To generate a unique note id
const {
    readFromFile,
    readAndAppend,
    removeFromFile
 } = require("../helpers/fsUtils.js");

// GET Route for retrieving all the notesRouter
notesRouter.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//Add note
notesRouter.post('/', (req, res) => {
    
    const {title, text} = req.body;
    
    if(title && text /*req.body*/){
        const newNote = {
            id: uuidv4(),
            title,
            text,
            status: "success"
        };

        readAndAppend(newNote, "./db/db.json");
        res.json("Note added succesfully!")
    } else {
        res.error("Error")
    }
});

// Delete specidic notesRouter with id 
notesRouter.delete('/:id', (req, res) => {
    
    console.log(req.params);
    console.log(req.params.id);

    const noteId = req.params.id;
    
    if(req.params){
        removeFromFile(noteId);
    } else {
        res.json("Can not delete note")
    }
}); 

module.exports = notesRouter;