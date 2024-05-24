const { Post } = require("../models/postModel");
const { User } = require("../models/userModel");

// create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    if (!title || !userId) {
      return res.status(400).json({ message: "Title and userId required" });
    }
    // check if the user exist
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res
        .status(400)
        .json({ message: "The specified user does not exist" });
    }

    // create a post
    const newPost = await Post.create({ title, description, userId });
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create post" });
  }
};

// get all posts
exports.getAllPosts = async (req, res) => {
  try {
    // const posts = await Post.find().populate("userId", "name");
    const posts = await Post.find().populate(User);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// get post by id
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate(
      "userId",
      "name"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch post" });
  }
};

// update post by id
exports.updatePostById = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      req.body,
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update post" });
  }
};

// delete post by id
exports.deletePostById = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
