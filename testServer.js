// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Star Wars Characters (DATA)
// =============================================================
var reservations = [{
"customerName": "T1 name",
"phoneNumber": "T1 phone",
"customerEmail": "T1 email",
"customerID": "T1"
},
{
"customerName": "T2 name",
"phoneNumber": "T2 phone",
"customerEmail": "T2 email",
"customerID": "T2"
}];
var waitList = [{
"customerName": "W1 name",
"phoneNumber": "W1 phone",
"customerEmail": "W1 email",
"customerID": "W1"
},
{
"customerName": "W@ name",
"phoneNumber": "W@ phone",
"customerEmail": "W@ email",
"customerID": "W@"
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/tables", function(req, res) {
  return res.json(reservations);
});

app.get("/api/waiting-list", function(req, res) {
  return res.json(waitList);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  console.log("Api New route");
  var newReservation = req.body;
//  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  if (reservations.length<5) reservations.push(newReservation);
  else waitList.length.push(newReservation);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
