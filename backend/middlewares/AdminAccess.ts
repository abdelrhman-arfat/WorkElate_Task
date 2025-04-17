import { NextFunction, Request, Response } from "express";
import { ROLES } from "../constants/role.js";

export const AdminAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.user;
    if (role !== ROLES.ADMIN) {
      res.status(403).json({
        success: false,
        data: null,
        error: true,
        code: 403,
        message: "You are not authorized to access this resource",
      });
      return;
    }
    next();
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
      error: true,
      code: 500,
    });
  }
};
