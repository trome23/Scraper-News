var cheerio = require("cheerio");
var mongoose = require("mongoose");
var axios = require("axios");

var express = require("express");
var app = express()

app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(3000, function() {
    console.log("App running on port 3000!");
  });


