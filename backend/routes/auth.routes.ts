import { Router } from "express";
import {
  login,
  logout,
  refreshToken,
  signup,
} from "../controller/auth.controller.js";
import { body } from "express-validator";
import { checkToken } from "../middlewares/checkToken.js";
const validateSignup = [
  body("name").notEmpty().withMessage("Name is required").isLength({
    min: 2,
    max: 20,
  }),
  body("username").notEmpty().withMessage("Username is required").isLength({
    min: 3,
    max: 20,
  }),
  body("password").notEmpty().withMessage("Password is required").isLength({
    min: 8,
    max: 20,
  }),
];

const validateLogin = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const router = Router();
router
  .post("/signup", validateSignup, signup)
  .post("/login", validateLogin, login)
  .post("/refresh-token",refreshToken)
  .post("/logout", checkToken, logout);

export { router as authRoutes };
