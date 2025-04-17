import { Request, Response } from "express";
import { Review } from "../schemas/reviewsSchema.js";
import { isValidObjectId } from "mongoose";
import { validationResult } from "express-validator";

const createReview = async (req: Request, res: Response) => {
  try {
    const { comment, bookId } = req.body;
    const { _id: userId } = req.user;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        data: null,
        code: 400,
        error: true,
      });
      return;
    }

    const review = await new Review({
      bookId,
      userId,
      comment,
    });
    await review.save();
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
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
      code: 500,
    });
  }
};

const bookReviews = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    if (!bookId || !isValidObjectId(bookId)) {
      res.status(400).json({
        message: "Book id is wrong",
        data: null,
        code: 400,
        error: false,
      });
      return;
    }
    const [reviews, totalReviews] = await Promise.all([
      Review.find({ bookId }).populate("userId", "name image"),
      Review.countDocuments({ bookId }),
    ]);

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
      totalReviews,
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
      code: 500,
    });
  }
};
export { createReview, bookReviews };
