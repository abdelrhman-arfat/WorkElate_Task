import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../constants/envVariable.js";
import { isValidObjectId, ObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import { MyJwtPayload } from "../types/MyJwtPayload.js";

declare global {
  namespace Express {
    interface Request {
      user: {
        password?: string;
        image: any;
        _id: ObjectId;
        username: string;
        name: string;
        role: string;
      };
    }
  }
}

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Please login to access this resource",
        data: null,
        error: true,
        code: 401,
      });
      return;
    }
    const decoded = (await jwt.verify(
      token,
      JWT_SECRET as string
    )) as MyJwtPayload;
    if (!decoded || !isValidObjectId(decoded._id)) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 0,
      });
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 0,
      });

      res.status(401).json({
        error: null,
        data: null,
        success: true,
        code: 401,
        message: "You should login first",
      });
      return;
    }
    req.user = decoded;
    next();
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
