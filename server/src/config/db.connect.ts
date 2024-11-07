import mongoose from "mongoose";

const dbConnect = async () => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    console.error("Error: MONGO_URL is not defined in environment variables.");
    return;
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log("Database connection established");
  } catch (error: any) {
    console.log("Database connection error", error.message);
  }
};

dbConnect();
