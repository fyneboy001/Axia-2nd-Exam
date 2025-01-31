//import express and router
const express = require("express");
const route = express.Router();
//import your controller functions inside an object
const {
  createUser,
  deleteUser,
  getSingleUser,
} = require("../controller/controller.user");

//creating route for the different functions(CRUD operators)
route.post("/user", createUser);
route.delete("/user/:id", deleteUser);
route.get("/user/:id", getSingleUser);

//exporting your route
module.exports = route;
