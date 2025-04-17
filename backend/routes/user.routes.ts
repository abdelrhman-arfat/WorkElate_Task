import { Router } from "express";
import { changePassword, getUserById, updateUser } from "../controller/user.controller.js";
import { checkToken } from "../middlewares/checkToken.js";
import { upload } from "../config/cloudinaryConfig.js";

const router = Router();

router
  .get("/:id  ", getUserById)
  .patch("/change-password/:id" , checkToken ,changePassword)
  .put("/:id", checkToken, upload.single("image"), updateUser);

export { router as userRoutes };
