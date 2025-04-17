import jwt from "jsonwebtoken";
import { TTokenPayload } from "../types/TokenPayloadType.js";
import { JWT_SECRET } from "../constants/envVariable.js";

const createToken = async (user: TTokenPayload) => {
  try {
    const token = await jwt.sign(user, JWT_SECRET as string, {
      expiresIn: "20m",
    });
    return token;
  } catch (error) {
    console.error(error);
  }
};

export { createToken };
