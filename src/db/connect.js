const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // console.log(process.env.MONGODB_URL);

    await mongoose.connect(process.env.MONGODB_URL).then(() => {
      console.log("Success");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
