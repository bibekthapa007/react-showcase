const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

//Create a Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  isVerified: { type: Boolean, default: false },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  createdAt: { type: Date, required: true, default: Date.now }
});

//Create the model
const userModel = mongoose.model("User", userSchema);

//export
module.exports = userModel;
