const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;

const intialDbConnection = async () => {
  try {
    // no extra options needed anymore in Mongoose 6+
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};

module.exports = { intialDbConnection };