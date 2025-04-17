import { Request, Response } from "express";
import { User } from "../schemas/UserSchema.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/createToken.js";
import {  REFRESH_TOKEN_SECRET } from "../constants/envVariable.js";
import { createRefreshToken } from "../utils/createRefreshToken.js";
import { isValidObjectId } from "mongoose";
import { ROLES } from "../constants/role.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const signup = async (req: Request, res: Response) => {
  try {
    const { name, username, password, role = ROLES.USER } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        data: null,
        error: true,
        code: 400,
      });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await new User({
      name,
      username,
      password: hashPassword,
      role,
    });
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
      sameSite: "lax",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 20 * 60 * 1000, // 20 minutes
      sameSite: "lax",
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userInfo,
      error: false,
      code: 201,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
      error: true,
      errorMessage: error.message,
      code: 500,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: true,
        code: 400,
        message: errors.array()[0].msg,
        data: null,
      });
      return;
    }

    const user = await User.findOne({ username }).select("+password");
    if (!user || !isValidObjectId(user._id)) {
      res.status(400).json({
        success: false,
        message: "Invalid username or password",
        data: null,
        error: true,
        errorMessage: "Invalid username or password",
        code: 400,
      });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({
        success: false,
        message: "Invalid username or password",
        data: null,
        error: true,
        errorMessage: "Invalid username or password",
        code: 400,
      });
      return;
    }
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
      sameSite: "lax",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 20 * 60 * 1000, // 20 minutes
      sameSite: "lax",
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: userInfo,
      error: false,
      code: 200,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
      error: true,
      errorMessage: error.message,
      code: 500,
    });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 0,
    });
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 0,
    });
    res.status(200).json({
      success: true,
      message: "Logout successful",
      data: null,
      error: false,
      code: 200,
    });
  } catch (error) {}
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
        error: true,
        errorMessage: "Unauthorized",
        code: 401,
      });
      return;
    }
    const decoded = (await jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET as string
    )) as jwt.JwtPayload;
    if (!decoded || !isValidObjectId(decoded._id)) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
        error: true,
        errorMessage: "Unauthorized",
        code: 401,
      });
      return;
    }
    const userInfo = {
      _id: decoded._id.toString(),
      name: decoded.name,
      username: decoded.username,
      role: decoded.role as "admin" | "user",
      image: decoded.image || "",
    };
    const token = await createToken(userInfo);
    if (!token) {
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
      sameSite: "lax",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 20 * 60 * 1000, // 20 minutes
      sameSite: "lax",
    });
    res.status(200).json({
      success: true,
      message: "Token refreshed",
      data: userInfo,
      error: false,
      code: 200,
    });
  } catch (err) {
    console.log(err);
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
      error: true,
      errorMessage: error.message,
      code: 500,
    });
  }
};

export { signup, login, logout, refreshToken };
