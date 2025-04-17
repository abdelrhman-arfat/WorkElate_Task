import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV;
const CLOUD_KEY = process.env.CLOUD_KEY;
const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_SECRET = process.env.CLOUD_SECRET;
export {
  MONGO_URL,
  PORT,
  CORS_ORIGIN,
  JWT_SECRET,
  REFRESH_TOKEN_SECRET,
  NODE_ENV,
  CLOUD_KEY,
  CLOUD_NAME,
  CLOUD_SECRET,
};
