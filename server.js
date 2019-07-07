var cheerio = require("cheerio");
var axios = require("axios");

console.log("\n***********************************\n" +
    "scraping npr" +
    "\n***********************************\n");

axios.get("http://www.npr.org/sections/news/").then(function (response) {
    var $ = cheerio.load(response.data);
    var results = [];

    $("article").each(function (i, element) {
        var title = $(element).children(".item-info-wrap").children().children("h2.title").text();
        var url = $(element).children().children().children().attr("href");
        
        var summary = $(element).children(".item-info-wrap").children().children("p.teaser").text();

        results.push({
            headline: title,
            url: url,
            summary: summary
        });
    });

    console.log(results);

});