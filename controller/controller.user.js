//import your model and bycrypt(to hash your password)
const userModel = require("../model/model.user");
const bcrypt = require("bcryptjs");

//Create the createUser function
const createUser = async (req, res) => {
  const { password, ...others } = req.body;
  //salt the password for hashing
  const salt = bcrypt.genSaltSync(10);

  //Hashing the password passed from the frontend
  const hashPassword = await bcrypt.hash(password, salt);
  console.log(hashPassword);

  //validating if the email sent from the frontend already exist
  const checkUserEmail = await userModel.findOne({ email: others.email });
  if (checkUserEmail) {
    return res.json("User already exist");
  }

  //using try save the user information and catch error by sending a message back if something goes wrong
  try {
    const newUser = new userModel({ password: hashPassword, ...others });
    await newUser.save();
    return res.json("User account created successfully");
  } catch (error) {
    return res.json("Unable to create account");
  }
};

//Generate a function that get all post created by users
const getAllPost = async (req, res) => {
  try {
    const allPost = await postModel.find();
    return res.json(allPost);
  } catch (error) {
    res.send("something went wrong");
  }
};

//Generate a function to delete a User
const deleteUser = async (req, res) => {
  //request for the user id
  const { id } = req.body;

  //using try and catch delete the user or send a message back
  try {
    const user = await userModel.findByIdAndDelete(id);
    res.send("User Account Deleted Successfully");
  } catch (error) {
    res.send("something went wrong");
  }
};

const getOnePost = async (req, res) => {
  const { id } = req.params;
  try {
    //const onePost = await postModel.findById(req.params.id);
    const onePost = await postModel.findById(id);
    return res.json(onePost);
  } catch (error) {
    res.send("something went wrong");
  }
};

//Export your function inside an object which will be imported in the route
module.exports = { createUser, getAllPost, getOnePost, deleteUser };
