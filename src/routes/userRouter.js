const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// const { jwtAuthMiddleware } = require("../jwt");
// router.use(jwtAuthMiddleware);

// Retrieve all users
router.get("/", userController.getAllUsers);

// Route for retrieving user details by ID
router.get("/:userId", userController.getUserById);

// Route for updating user details by ID
router.put("/:userId", userController.updateUserById);

// Route for deleting user by ID
router.delete("/:userId", userController.deleteUserById);

module.exports = router;
