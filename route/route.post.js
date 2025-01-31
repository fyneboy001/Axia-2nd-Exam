//import express and router
const express = require("express");
const route = express.Router();
//importing my functions from my controller
const {
  createPost,
  getAllPost,
  deletePost,
  getOnePost,
} = require("../controller/controller.post");

//creating my route for my functions
route.post("/post", createPost);
route.delete("/post/:id", deletePost);
rout.get("/post", getAllPost);
rout.get("/post", getOnePost);

module.exports = route;
