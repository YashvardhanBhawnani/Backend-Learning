import mongoose from "mongoose";

const connectDb = async (uri) => {
  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.log("Connection Error : ", err.message);
  }
};
export default connectDb;
