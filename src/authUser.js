const express = require("express");
const router = express.Router();
const userController = require("../src/controllers/userController");

// Route for creating a new user
router.post("/login", userController.loginUser);

// Route for creating a new user
router.post("/signup", userController.createUser);

module.exports = router;
