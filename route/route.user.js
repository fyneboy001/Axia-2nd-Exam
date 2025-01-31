//import express and router
const express = require("express");
const route = express.Router();
//import your controller functions inside an object
const { createUser, deleteUser } = require("../controller/controller.user");

//create your route
route.post("/user", createUser);
route.delete("/user/:id", deleteUser);

module.exports = route;
