var cheerio = require("cheerio");
var mongoose = require("mongoose");
var axios = require("axios");
var exphbs = require("express-handlebars");
var express = require("express");

var app = express()

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = process.env.PORT || 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperNews";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Connected to Mongoose!")
})

app.get("/", function (req, res) {
    db.Article.find({ saved: false }).then(function (data) {
        var hbsObject = {
            articles: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});


// Scrape articles from Fox News
app.get("/scrape", function (req, res) {

    axios.get("https://www.foxnews.com/").then(function (response) {
        console.log("We are startin to scrape!")

        var $ = cheerio.load(response.data);
        console.log(response.data);
        

        $("article").each(function (i, element) {

            console.log("scraping Item")
            var result = {};

            result.saved = false;
            result.title = $(this)
                .find("h2")
                .text();
            result.link = $(this)
                .find("a")
                .attr("href");

            var fullText = $(this)
                .find(".content")
                .text();

            result.blurb = fullText.substring(fullText.indexOf("-") + 2, fullText.lastIndexOf(" R"))

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });

        res.redirect("/");

    });
});

// GET all articles from DB
app.get("/articles", function (req, res) {

    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });


