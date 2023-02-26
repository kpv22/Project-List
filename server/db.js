import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(MONGODB_URI, { dbName: "Mern_Apollo" });
    console.log(`Mongodb connected:${conn.connection.name}`);
  } catch (error) {
    console.error(`Error:${error.message}`);
    process.exit(1);
  }
};
