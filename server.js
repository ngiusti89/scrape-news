var cheerio = require("cheerio");
var axios = require("axios");

console.log("\n***********************************\n" +
    "scraping\n" +
    "\n***********************************\n");

axios.get("http://www.npr.org/sections/news/").then(function (response) {
    var $ = cheerio.load(response.data);
    var results = [];

    $("article").each(function (i, element) {
        var title = $(element).children("item-info").children(".title").children("a").text();

        var link = $(element).children("item-info").find("h2.title").find("a").attr("href");

        results.push({
            title: title,
            link: link
        });
    });

    console.log(results);

});