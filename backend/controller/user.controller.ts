import { Request, Response } from "express";
import { User } from "../schemas/UserSchema.js";
import { isValidObjectId } from "mongoose";
import { deleteExistImage } from "../config/cloudinaryConfig.js";
import { NODE_ENV } from "../constants/envVariable.js";
import { createRefreshToken } from "../utils/createRefreshToken.js";
import { createToken } from "../utils/createToken.js";
import bcrypt from "bcryptjs";
// i use jwt payload to store user info
const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || !isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid user ID",
        data: null,
        error: true,
        code: 400,
      });
      return;
    }
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
        error: true,
        code: 404,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
      error: false,
      code: 200,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const senderData = req.user;
    if (!isValidObjectId(senderData._id)) {
      res.status(400).json({
        success: false,
        message: "Invalid user ID",
        error: true,
        code: 400,
        data: null,
      });
      return;
    }
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid user ID",
        error: true,
        code: 400,
        data: null,
      });
      return;
    }

    if (senderData._id.toString() !== id.toString()) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to update this user",
        error: true,
        code: 403,
        data: null,
      });
      return;
    }
    const { name } = req.body;
    const image = req.file?.path;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: true,
        code: 404,
        data: null,
      });
      return;
    }
    if (image) {
      await deleteExistImage(user.image);
      user.image = image;
    }
    if (name) {
      user.name = name;
    }

    await user.save();

    const userInfo = {
      _id: user._id.toString(),
      name: user.name,
      username: user.username,
      role: user.role,
      image: user.image,
    };
    const token = await createToken(userInfo);
    const refreshToken = await createRefreshToken(userInfo);
    if (!token || !refreshToken) {
      res.status(500).json({
        success: false,
        message: "Failed to create token",
        data: null,
        error: true,
        errorMessage: "Failed to create token",
        code: 500,
      });
      return;
    }
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "none",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 20 * 60 * 1000, // 20 minutes
      sameSite: "none",
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
      code: 200,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: true,
      code: 500,
      data: null,
    });
  }
};
const changePassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const { newPassword, oldPassword } = req.body;
    if (id.toString() !== user._id.toString()) {
      res.status(403).json({
        message: "you can't change this password",
        code: 403,
        data: null,
        error: true,
        success: false,
      });
      return;
    }

    const newUser = await User.findOne({ _id: id }).select("+password");
    if (
      newUser === null ||
      !isValidObjectId(newUser._id) ||
      newUser.password === null
    ) {
      res.status(404).json({
        message: "user not found",
        code: 404,
        error: true,
        success: false,
        data: null,
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      newUser?.password || ""
    );

    if (!isPasswordCorrect) {
      res.status(400).json({
        message: "the old password isn't correct",
        data: null,
        code: 400,
        success: true,
        error: false,
      });
      return;
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    if (newUser?.password) {
      newUser.password = newHashedPassword;
      newUser?.save();
    }

    res.status(200).json({
      message: "password update success full ",
      code: 200,
      success: true,
      error: false,
      data: null,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      message: error.message || "internal error",
      code: 500,
      success: false,
      error: true,
      data: null,
    });
  }
};
export { getUserById, updateUser, changePassword };
