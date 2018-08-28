// Require .env file variables
require('dotenv').config();

const bodyParser = require("body-parser");
const ejsLayouts = require("express-ejs-layouts");
const express = require("express");
const flash = require("connect-flash");
const passport = require("./config/passportConfig");
const session = require("express-session");

const app = express();

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public/"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Custom middleware
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

app.use("/auth", require("./controllers/auth"));
app.use("/profile", require("./controllers/profile"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log(
    "You're listening to the smooth sounds of port 3000 in the morning"
  );
});
