import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

async function uploadImageToFolder(req, res, next, folder) {
  try {
    const file = req.file
    if (!file) return res.status(400).json({ error: "No file" })

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder, // cloudinary portal folder location - see exported functs
          resource_type: "image",
          transformation: [{ width: 1600, height: 1600, crop: "limit" }]
        },
        (err, uploadResult) => (err ? reject(err) : resolve(uploadResult))
      )
      stream.end(file.buffer)
    })

    const payload = {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format
    }

    return res.status(201).json(payload)
  } catch (err) {
    next(err)
  }
}

export function uploadClothingImage(req, res, next) {
  return uploadImageToFolder(req, res, next, "hung-up/clothes")
}

export function uploadOutfitImage(req, res, next) {
  return uploadImageToFolder(req, res, next, "hung-up/outfits")
}
