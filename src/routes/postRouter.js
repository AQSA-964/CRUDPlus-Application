const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { jwtAuthMiddleware } = require("../jwt");
router.use(jwtAuthMiddleware);

// Create a new post
router.post("/", postController.createPost);

// Retrieve all posts
router.get("/", postController.getAllPosts);

// Retrieve a specific post
router.get("/:postId", postController.getPostById);

// Update a post
router.put("/:postId", postController.updatePostById);

// Delete a post
router.delete("/:postId", postController.deletePostById);

module.exports = router;
