const notesRouter = require("express").Router();
const { v4: uuidv4 } = require('uuid'); //To generate a unique note id
const {
    readFromFile,
    readAndAppend,
    writeToFile
    // removeFromFile
 } = require("../helpers/fsUtils.js");

// GET Route for retrieving all the notesRouter
notesRouter.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//Add note
notesRouter.post('/', (req, res) => {
    console.log(req.body)
    const {title, text} = req.body;
    
    if(title && text){
        const newNote = {
            id: uuidv4(),
            title,
            text,
            status: "success"
        };

        readAndAppend(newNote, "./db/db.json");
        res.json(`Note has been added succesfully!`)
        
    } else {
        res.error("Error")
    }
});

// Delete specidic notesRouter with id 
notesRouter.delete('/:id', (req, res) => {
    
    console.log(req.params);
    const { id } = req.params;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== id);
    
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
    
        // Respond to the DELETE request
        res.json(`Item ${id} has been deleted 🗑️`);
    });
    
    // if(req.params){

    //     removeFromFile(id)
    //     .then(() => {
    //         res.locals.redirect = "/notes";
    //     })
    //     .catch(error => {
    //         console.log(`Error deleting user by ID: ${error.message}`);
    //     });
    // } else {
    //     res.json("Can not delete note")
    // }
}); 

module.exports = notesRouter;