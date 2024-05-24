const { User } = require("../models/userModel");
const { Post } = require("../models/postModel");
const { generateToken } = require("../jwt");

exports.loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ username: username });

    if (
      !user ||
      !(await user.comparePassword(password)) ||
      !(await user.compareEmail(email))
    ) {
      return res
        .status(401)
        .json({ error: "Invalid username or password or email" });
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const token = generateToken(payload);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email and password must required" });
    }
    const newUser = await User.create({ username, email, password });
    const payload = {
      id: newUser.id,
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is", token);
    res.status(200).json({ newUser: newUser, token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create user" });
  }
};

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Controller function to get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get user" });
  }
};

// Controller function to update user by ID
exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update user" });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await User.deleteOne({ _id: user._id });

    // Cascade deletion of posts associated with the user
    await Post.deleteMany({ author: req.params.userId });

    res
      .status(200)
      .json({ message: "User and associated posts deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete user and associated posts" });
  }
};
