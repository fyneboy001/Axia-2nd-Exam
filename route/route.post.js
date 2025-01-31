//import express and router
const express = require("express");
const route = express.Router();
//importing my functions from my controller
const {
  createPost,
  getSinglePost,
  deletePost,
  getAllPost,
} = require("../controller/controller.post");

//Performing your CRUD operator
route.post("/post", createPost);
route.delete("/post/:id", deletePost);
route.get("/post/:id", getSinglePost);
route.get("/post", getAllPost);

//exporting your route
module.exports = route;
