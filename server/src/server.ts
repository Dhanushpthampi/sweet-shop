import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
import { connectDB } from "./config/db";


dotenv.config();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  await mongoose.connection.syncIndexes();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
