import mongoose from "mongoose";
import { MONGO_URL } from "../constants/envVariable.js";

export const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URL as string);
    console.log("Connected to DB");
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
};
