import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import uploadImage from "../utils/uploadImage.js";

const imageRouter = Router()

imageRouter.post('/upload', upload.single('image'), uploadImage)

export default imageRouter;