const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongodb connected");
  } catch (error) {
    console.log("error connecting mongodb");
    console.log(error.message);
    throw error;
  }
};

module.exports = connectDB;
