import mongoose from "mongoose";
type TBook = {
  title: string;
  description: string;
  image: string;
  count: number;
};

const bookSchema = new mongoose.Schema<TBook>({
  title: { type: String, required: true, max: 30, min: 3 },
  description: { type: String, required: true, min: 10, max: 500 },
  image: { type: String, required: true },
  count: { type: Number, default: 1, min: 0 },
});

const Book =
  mongoose.model<TBook>("books", bookSchema) ||
  mongoose.model("books", bookSchema);

export { Book };
