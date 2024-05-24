const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");

router.patch("/posts/:postId/likes", likeController.likePost);

module.exports = router;
