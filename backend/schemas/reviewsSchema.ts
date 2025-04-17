import mongoose, { ObjectId } from "mongoose";

type TReview = {
  bookId: ObjectId;
  userId: ObjectId;
  comment: string;
};

const reviewSchema = new mongoose.Schema<TReview>({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "books",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  comment: {
    type: String,
    required: true,
    min: 3,
    max: 300,
  },
 
});

const Review =
  mongoose.model<TReview>("reviews", reviewSchema) ||
  mongoose.model("reviews", reviewSchema);

export { Review };
