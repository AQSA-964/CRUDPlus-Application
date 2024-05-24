const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// add comment
router.patch("/:postId/comments", commentController.addComment);

//get all comments
router.get("/:postId/comments", commentController.getCommentsByPostId);

// update comment
router.put("/:postId/comments/:commentId", commentController.updateCommentById);

// delete comment
router.delete(
  "/:postId/comments/:commentId",
  commentController.deleteCommentById
);

module.exports = router;
