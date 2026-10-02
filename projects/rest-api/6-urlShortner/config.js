import mongoose from "mongoose";

const connectDb = async (uri) => {
  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
export default connectDb;
