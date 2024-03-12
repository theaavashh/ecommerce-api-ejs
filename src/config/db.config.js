import mongoose from "mongoose";

const dbConfig = async (dbURI) => {
  try {
    await mongoose.connect(dbURI);
    console.log("Database connected");
  } catch (error) {
    console.log("Database error", error);
    process.exit(1);
  }
};

export default dbConfig;
