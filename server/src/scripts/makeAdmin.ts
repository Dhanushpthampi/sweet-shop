// src/scripts/makeAdmin.ts
import mongoose from "mongoose";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();

async function makeAdmin() {
  await mongoose.connect(process.env.MONGO_URI as string);

  await User.updateOne(
    { email: "admin@test.com" },
    { role: "ADMIN" }
  );

  console.log("Admin promoted");
  process.exit();
}

makeAdmin();
