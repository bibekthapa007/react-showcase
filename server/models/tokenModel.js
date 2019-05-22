const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const tokenSchema = new Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

//Create the model
const tokenModel = mongoose.model("Token", tokenSchema);

//export
module.exports = tokenModel;
