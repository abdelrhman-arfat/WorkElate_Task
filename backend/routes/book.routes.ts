import { Router } from "express";
import { getAllBooks, getBookById } from "../controller/book.controller.js";
import { createBook } from "../controller/book.controller.js";
import { checkToken } from "../middlewares/checkToken.js";
import { AdminAccess } from "../middlewares/AdminAccess.js";
import { upload } from "../config/cloudinaryConfig.js";
import { body } from "express-validator";

const validateCreateBook = [
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({
      min: 10,
      max: 500,
    }),
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 30 }),
  body("count").notEmpty().withMessage("Count is required").isInt({ min: 1 }),
];

const router = Router();

router.get("/", getAllBooks).get("/:id", getBookById);
router.post(
  "/",
  checkToken,
  AdminAccess,
  upload.single("image"),
  validateCreateBook,
  createBook
);

export { router as bookRoutes };
