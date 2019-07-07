var cheerio = require("cheerio");
var axios = require("axios");
var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var db = require("./models");
var PORT = 3000;

// var databaseUrl = "scrapedNPR";
// var collections = ["scrapedData"];

// var db = mongojs(databaseUrl, collections);
// db.on("error", function (error) {
//     console.log("Database Error:", error);
// });

mongoose.connect("mongodb://localhost/scrapeNPR", { useNewUrlParser: true });

app.get("/scrape", function (req, res) {
    axios.get("http://www.npr.org/sections/news/").then(function (response) {
        var $ = cheerio.load(response.data);

        $("article").each(function (i, element) {
            var result = {};
            result.title = $(this).children(".item-info-wrap").children().children("h2.title").text();
            result.url = $(this).children().children().children().attr("href");
            result.summary = $(this).children(".item-info-wrap").children().children("p.teaser").text();

            db.article.create(result).then(function (dbarticle) {
                console.log(dbarticle);
            }).catch(function (err) {
                console.log(err);
            });

            // results.push({
            //     headline: title,
            //     url: url,
            //     summary: summary
            // });
        });
        // console.log(results);
        res.send("scrape complete");
    });
});

app.get("/articles", function (req, res) {
    db.article.find({}).then(function (dbarticle) {
        res.json(dbArticle);
    }).catch(function (err) {
        res.json(err);
    });
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

// console.log("\n***********************************\n" +
//     "scraping npr" +
//     "\n***********************************\n");