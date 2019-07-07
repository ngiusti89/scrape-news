var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "comment"
    }
});

var article = mongoose.model("article", articleSchema);

module.exports = article;