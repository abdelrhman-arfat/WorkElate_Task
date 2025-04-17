import { Request, Response } from "express";
import { Book } from "../schemas/bookSchema.js";
import { validationResult } from "express-validator";

const createBook = async (req: Request, res: Response) => {
  try {
    const { title, description, count } = req.body;
    const image = req.file?.path;
    if (!image) {
      res.status(400).json({
        success: false,
        message: "Image is required",
        data: null,
        error: true,
        code: 400,
      });
      return;
    }
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

    const book = await new Book({
      title,
      count,
      description,
      image: image,
    });
    await book.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
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

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 12, search, startsWith } = req.query;

    const filter: {
      title?: RegExp;
    } = {};

    if (search && search.toString().trim() !== "") {
      filter.title = new RegExp(search as string, "i");
    }

    if (startsWith && startsWith.toString().trim() !== "") {
      filter.title = new RegExp("^" + startsWith, "i");
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [books, totalBooks] = await Promise.all([
      Book.find(filter ? filter : {})
        .skip(skip)
        .limit(Number(limit)),
      Book.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalBooks / Number(limit));
    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
      totalPages,
      totalBooks,
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
const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
        error: true,
        code: 404,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Book fetched successfully",
      data: {
        book,
      },
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
export { createBook, getAllBooks, getBookById };
