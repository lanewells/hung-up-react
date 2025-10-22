import { Router } from "express"
import multer from "multer"
import { uploadImage } from "../controllers/uploadController.js"

const r = Router()

// in-memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (_req, file, cb) => {
    const ok = /^image\/(png|jpe?g|webp|gif|heic|heif)$/i.test(file.mimetype)
    cb(ok ? null : new Error("Invalid file type"), ok)
  }
})

r.post("/image", upload.single("image"), uploadImage)

export default r
