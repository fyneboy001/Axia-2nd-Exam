//import your postModel
const postModel = require("../model/model.post");

//generate a function that enables a user create a post
const createPost = async (req, res) => {
  const body = req.body;

  //using try and catch save the information the user sends from the frontend or send a message if something goes wrong
  try {
    const newPost = new postModel(body);
    await newPost.save();
    res.json("post created successfully");
  } catch (error) {
    res.send("something went wrong");
  }
};

//create a function that get one post from your database
const getSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    //const onePost = await postModel.findById(req.params.id);
    const onePost = await postModel.findById(id);
    return res.json(onePost);
  } catch (error) {
    res.send("something went wrong");
  }
};

//Creating a function for a user to delete a post. only the creator is allowed to delete a post
const deletePost = async (req, res) => {
  const { creatorId } = req.body;
  const { id } = req.params;

  //using try and catch to delete the post or send a message if something goes worng
  try {
    //get the post to be deleted using the id
    const post = await postModel.findById(id);

    //check if post exist, else send error message to user
    if (!post) {
      return res.send("Post not found");
    }
    //check if the creatorid in the post matches the creator id passed from the body
    if (post.creatorId.toString() !== creatorId) {
      return res.send("this post does not belong to you");
    }

    await postModel.findByIdAndDelete(id);
    res.send("Post deleted successfully");
  } catch (error) {
    res.send("something went wrong");
  }
};

//Get all the post the users created
const getAllPost = async (req, res) => {
  try {
    const allPost = await postModel.find();
    return res.json(allPost);
  } catch (error) {
    res.send("something went wrong");
  }
};

//export your functions and import them in your route
module.exports = { createPost, getSinglePost, deletePost, getAllPost };
