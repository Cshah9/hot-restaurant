// Requiring dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");

// Set our port to 8080
var PORT = process.env.PORT || 8080;
var app = express();

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

var reservations = [];

//get home page if requested
app.get("/", function(req, res) {

  res.sendFile(path.join(__dirname, "index.html"));

});

//show reservation page with blank fields..so that the user can enter their details
app.get("/reserve", function(req, res) {
  
  res.sendFile(path.join(__dirname, "reserve.html"));

});

//capture data entered by user in above page and store in array
app.post("/reserve", function(req, res) {
  var newReservation = req.body;
  //newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);
  reservations.push(newReservation);
  res.json(newReservation);
})


//if clicked on View Tables, show existing reservations..need to think how data will be dispayed inside the page
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));

    // for (var i = 0; i < reservations.length; i==) {
    //   return res.json(reservations[i]);
    // }
});

//return table-reservation data
app.get("/api/tables", function(req, res) {
  
      return res.json(reservations);
  

});

//return waitlist data
app.get("/api/wait-list", function(req, res) {

});



