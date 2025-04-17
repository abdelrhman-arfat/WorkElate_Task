import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import {
  CLOUD_KEY,
  CLOUD_NAME,
  CLOUD_SECRET,
} from "../constants/envVariable.js";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const fileExt = path.extname(file.originalname).slice(1) || "jpg" || "png";
    const baseName = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    const timestamp = Date.now();

    return {
      folder: "uploads",
      format: fileExt,
      public_id: `${baseName}-${timestamp}`,
    };
  },
});

const upload = multer({ storage });

// if you want to delete image from cloudinary
const deleteExistImage = async (oldImage: string) => {
  try {
    if (!oldImage) return;

    const encodedFilename = oldImage.split("/").pop(); // get ex: filename.png
    if (!encodedFilename) {
      console.error("Unable to extract filename from URL.");
      return;
    }

    const decodedFilename = decodeURIComponent(encodedFilename);
    // get ex: public_id
    const baseName = decodedFilename.split(".")[0];

    if (!baseName) {
      console.error("Invalid image URL: Cannot extract baseName.");
      return;
    }

    const public_id = `uploads/${baseName}`;

    await cloudinary.uploader.destroy(public_id);
  } catch (err: any) {
    console.error("Error deleting image:", err.message);
  }
};

export { cloudinary, upload, deleteExistImage };
