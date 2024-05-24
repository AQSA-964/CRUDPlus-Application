const { Post } = require("../models/postModel");
const { User } = require("../models/userModel");

exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment, userId } = req.body;

    // Check if comments and userId are provided
    if (!comment || !userId) {
      return res.status(400).json({ message: "comment and userId required" });
    }
    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the post exists
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Add the comment to the post and increment totalComments
    postExists.comments.push({ Comment: comment, userId: userId });
    postExists.totalComments += 1;

    // Save the updated post
    await postExists.save();

    res
      .status(201)
      .json({ message: "Comment added successfully", Post: postExists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};

exports.getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    // Find the post by ID and select only the comments field
    const post = await Post.findById(postId).select("comments");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve comments" });
  }
};

exports.updateCommentById = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { Comment } = req.body;

    // Update the comment in the database and fetch the updated post
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, "comments._id": commentId },
      { $set: { "comments.$.Comment": Comment } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post or comment not found" });
    }

    // Find the updated comment by its ID
    const updatedComment = updatedPost.comments.find(
      (comment) => comment._id.toString() === commentId
    );

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update comment" });
  }
};

exports.deleteCommentById = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    // Find the post by ID and remove the comment by its ID
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { comments: { _id: commentId } },
        $inc: { totalComments: -1 }, // Decrease totalComments by 1
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post or comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};
