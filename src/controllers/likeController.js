const { Post } = require("../models/postModel");
const { User } = require("../models/userModel");

exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    const existingLikeIndex = post.likes.findIndex(
      (like) => like.userId.toString() === userId
    );

    if (existingLikeIndex === -1) {
      // If the user hasn't liked the post, add a new like
      // post.likes.push({ likes: true, userId: userId });
      post.likes.push({ userId: userId });
      post.totalLikes += 1;
    } else {
      // If the user has already liked the post, remove the existing like
      post.likes.splice(existingLikeIndex, 1);
      post.totalLikes -= 1;
    }

    // Save the updated post
    const updatedPost = await post.save();
    // Respond with the updated post
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to add like" });
  }
};
