const { v4: uuidv4 } = require('uuid');
const fs = require ("fs");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests

   // /api/notes should read the db.json file and return all saved notes as JSON
  app.get('/api/notes', function (req, res) {
    fs.readFile("db/db.json", "utf8", function(error,data) {
      res.json(JSON.parse(data));
    });
    
  });

  // API POST Requests

  // ---------------------------------------------------------------------------

  // Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
    app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    newNote.id = uuidv4();
      fs.readFile("db/db.json", "utf8", function(error,data) {
        var data = JSON.parse(data);
        data.push(newNote);
        fs.writeFile("db/db.json", JSON.stringify(data), function(error){
          if (error)
           throw error;
           console.log("Written Successfully");
        })
      });
      res.json(newNote);

    });

    // Should receive a query parameter containing the id of a note to delete. 
    //  give each note a unique id when it's saved. 
    //  to delete a note, you'll need to read all notes from the db.json file, 
    // remove the note with the given id property, and then rewrite the notes to the db.json file.
    app.delete("/api/notes/:id", function(req, res) {
      fs.readFile("db/db.json", "utf8", function(error, data) {
        let noteId = req.params.id;
        let noteData = JSON.parse(data);
        noteData = noteData.filter(function(note) {
            if (noteId != note.id) {
              return true;
            } else {
              return false;
            };
        }); 
        fs.writeFile("db/db.json", JSON.stringify(noteData), function(error){
          if (error)
          throw error;
          res.end(console.log("Deleted Successfully"));
        })
      });

    });

};
