import { Router } from "express"
import multer from "multer"
import {
  uploadClothingImage,
  uploadOutfitImage
} from "../controllers/uploadController.js"

const r = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = /^image\/(png|jpe?g|webp|gif|heic|heif)$/i.test(file.mimetype)
    cb(ok ? null : new Error("Invalid file type"), ok)
  }
})

r.post("/image/clothing", upload.single("image"), uploadClothingImage)
r.post("/image/outfit", upload.single("image"), uploadOutfitImage)

export default r
