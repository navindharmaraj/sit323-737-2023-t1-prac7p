var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var router = express.Router();
const session = require('express-session');
const passport = require('./auth/passport'); // Import the Passport configuration

var path = __dirname + '/views/';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// parse application/json
app.use(bodyParser.json())
//Services
var calculation = require("./services/calculation");


router.get("/", function (req, res) {
    res.sendFile(path + "index.html");
});

app.use("/", router);
app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ user: req.user });
  });
app.post("/calc/add",passport.authenticate('local'),calculation.addition )//Function to add 2 numbers
app.post("/calc/sub",passport.authenticate('local'),calculation.subtraction )//Function to sub 2 numbers
app.post("/calc/mul",passport.authenticate('local'),calculation.multiplication )//Function to mul 2 numbers
app.post("/calc/div",passport.authenticate('local'),calculation.division )//Function to div 2 numbers
app.post("/addition",passport.authenticate('local'),calculation.n_addition )//Function to add n numbers


app.listen(5005, function () {
    console.log("Live at Port 5005");
});