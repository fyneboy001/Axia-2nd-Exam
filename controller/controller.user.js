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
    return res.status(409).json("User already exist");
  }

  //using try save the user information and catch error by sending a message back if something goes wrong
  try {
    const newUser = new userModel({ password: hashPassword, ...others });
    await newUser.save();
    return res.status(200).json("User account created successfully");
  } catch (error) {
    return res.status(400).json("Unable to create account");
  }
};

//delete user function
const deleteUser = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await userModel.findByIdAndDelete(id);
    res.status(200).send("User Account Deleted Successfully");
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

//Getting a single user
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const oneUser = await userModel.findById(id);
    return res.json(oneUser);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};
//Export your function inside an object which will be imported in the route
module.exports = { createUser, deleteUser, getSingleUser };
