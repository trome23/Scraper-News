var express = require("express");
var router = express.Router();
var path = require("path");

var request = require("request");
var cheerio = require("cheerio");

var Comment = require("../models/Comment")
var Article = require("../models/Article")

router.get("/", function(req, res) {
    res.redirect("/articles");
});

router.get("/scrape", function(req, res) {
    axios.get("https://news.vice.com/en_us").then(function(response) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape

    $("article h2").each(function(i, element) {

        var result = {};

        result.title = $(this)
        .children()
        .text();
        result.link = $(this)
        .attr("href");

        // Save these results in an object that we'll push into the results array we defined earlier
        db.Article.create(result)
            .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
            })
            .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
        });
    });
});
app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });