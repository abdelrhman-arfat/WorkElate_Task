import { Router } from "express";
import { bookReviews, createReview } from "../controller/reviews.controller.js";
import { checkToken } from "../middlewares/checkToken.js";
import { body } from "express-validator";

const router = Router();

const validateCreateReview = [
  body("comment").notEmpty().withMessage("Comment is required").isLength({
    max: 300,
    min: 3,
  }),
  body("bookId").notEmpty().withMessage("Book not found is required"),
];

router
  .get("/:bookId", bookReviews)
  .post("/", checkToken, validateCreateReview, createReview);

export { router as reviewRoutes };
