import jwt from "jsonwebtoken";
import { TTokenPayload } from "../types/TokenPayloadType.js";
import { REFRESH_TOKEN_SECRET } from "../constants/envVariable.js";

const createRefreshToken = async (user: TTokenPayload) => {
  try {
    const token = await jwt.sign(user, REFRESH_TOKEN_SECRET as string, {
      expiresIn: "20m",
    });
    return token;
  } catch (error) {
    console.error(error);
  }
};

export { createRefreshToken };
