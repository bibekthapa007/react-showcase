var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const imageSchema = new Schema({
  link: {
    type: String,
    required: true
  },
  title: String,
  artist: String,
  medium: String,
  contributor: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
