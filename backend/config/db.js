const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn("MONGO_URI is not set. Running without MongoDB.");
    return null;
  }
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    if (process.env.NODE_ENV === "test") return null;
    throw error;
  }
}

module.exports = connectDB;
