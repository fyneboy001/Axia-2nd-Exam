const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
//importing my routes so that my app can listen to them(i.e connecting my routes)
const userRoute = require("./route/route.user");
const postRoute = require("./route/route.post");
app.use(userRoute);

//connecting mongodb to our express application
mongoose
  .connect("mongodb://localhost:27017/Fyneboy")
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch(() => {
    console.log("Something went wrong");
  });

//attaching the postRoute to the index.js
app.use(postRoute);

//
app.listen(4000, () => {
  console.log("app is running");
});
