import express from "express";
import { CORS_ORIGIN, PORT } from "./constants/envVariable.js";
import { connectToDB } from "./db/connectToDB.js";
import { authRoutes } from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { bookRoutes } from "./routes/book.routes.js";
import { reviewRoutes } from "./routes/review.routes.js";
import { userRoutes } from "./routes/user.routes.js";
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port" + PORT);
  connectToDB();
});
