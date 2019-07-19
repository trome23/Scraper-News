var mongoose = require("mongoose")

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
      },
      blurb: {
        type: String,
        required: true
      },
      link: {
        type: String,
        required: true
      },
      saved: {
        type: Boolean,
        required: true
      },
      comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }]
});

var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;