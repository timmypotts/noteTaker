var js = requiere("fs");
var express = require("express");
var path = require("path");
var db = require('./db/db.json');

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });

  
  // Retrieve Notes
  app.get("/api/notes", function(req, res) {
    return res.json(characters);
  });
  
  // Displays a single character, or returns false
  app.post("/api/post", function(req, res) {
    var chosen = req.params.character;
  });

  app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});