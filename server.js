var fs = require("fs");
var express = require("express");
var path = require("path");
var file = require("./db/db.json");

var app = express();
var PORT = 3000;

var content = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/db/db.json"), (err, data) => {
    if (err) throw err;
  })
);

var pushNote = dbData => {
  fs.writeFileSync(
    path.join(__dirname, "/db/db.json"),
    JSON.stringify(dbData),
    err => {
      if (err) throw err;
    }
  );
};

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var jsonpath = "./db/db.json";

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Retrieve Notes
app.get("/api/notes", function(req, res) {
  res.json(content);
});

// Posts notes to db
app.post("/api/notes", function(req, res) {
  let data = req.body;
  let index = content.length;
  data.id = index;
  content.push(data);
  pushNote(content);
  return res.json(content);
});

app.delete("/api/notes/:id", function(req, res) {
  var id = req.params.id;

  var int = 1;
  content.splice(`${id - 1}`, 1);
  for (var i = 0; i < content.length; i++) {
    content[i].id = int;
    int = int + 1;
  }
  pushNote(content);
  res.send(content);
});

app.listen(process.env.PORT || 3000, function() {
  var port = server.address().port;
  console.log("App listening on PORT: " + port);
});
