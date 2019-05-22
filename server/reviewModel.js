var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const textSchema = new Schema({
  text: String
});

const reviewSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    // unique: true,
    required: true
  },
  parentId: Schema.Types.ObjectId,
  slug: String,
  user: {
    author: String,
    profileURL: String
  },
  review: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
