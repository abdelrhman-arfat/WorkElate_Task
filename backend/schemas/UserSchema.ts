import mongoose from "mongoose";

import { ROLES } from "../constants/role.js";

type TUser = {
  name: string;
  username: string;
  password: string;
  role: "admin" | "user";
  image: string;
};

const userSchema = new mongoose.Schema<TUser>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 10, select: false },
  role: { type: String, required: true, enum: [ROLES.ADMIN, ROLES.USER] }, // we can make roles more or make roles schema but this doesn't require for this project
  image: { type: String, default: "" },
});

userSchema.post("save", function (error: any, doc: any, next: any) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    if (error.keyPattern.username) {
      next(new Error("Username is already taken. Please choose another one."));
    } else {
      next(new Error("Duplicate key error."));
    }
  } else {
    next(error);
  }
});

const User =
  mongoose.model<TUser>("users", userSchema) ||
  mongoose.model("users", userSchema);

export { User };
