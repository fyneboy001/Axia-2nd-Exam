//import mongoose
const mongoose = require("mongoose");

//create the model users are to follow in creating their account
const user = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", user);

//export your userModel
module.exports = userModel;
