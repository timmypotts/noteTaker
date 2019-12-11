var fs = require("fs");
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
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

  
  // Retrieve Notes
  app.get("/api/notes", function(req, res) {

    return res.json('./db/db.json');

  });
  
  // Posts notes to db
  app.post("/api/notes", function(req, res) {

    var data = req.body;
    console.log(data);

    db.push(data);

    console.log(db);
    console.log(db.length);
  });

  app.delete("/api/notes/:id", function(req, res) {

  const id = req.params.id;

  const results = db.filter(results => db.id === id);

  });

  app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});


