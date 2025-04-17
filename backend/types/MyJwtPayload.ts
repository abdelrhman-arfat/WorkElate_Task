import { ObjectId } from "mongoose";

interface MyJwtPayload {
  _id: ObjectId;
  username: string;
  name: string;
  image: string;
  role: string;
  iat?: number;
  exp?: number;
}

export { MyJwtPayload };
