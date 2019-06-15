var cheerio = require("cheerio");
var mongoose = require("mongoose");
var axios = require("axios");
var logger = require("morgan")

var bodyParser = require("body-parser")

var express = require("express");
var app = express()

app.use(express.static("public"));

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost/scraper_news", { useNewUrlParser: true });
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Connected to Mongoose!")
})

app.listen(3000, function() {
    console.log("App running on port 3000!");
  });


