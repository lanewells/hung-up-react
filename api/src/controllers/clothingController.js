import Clothing from "../models/Clothing.js"

export async function getAllClothes(_req, res, next) {
  try {
    const docs = await Clothing.find().populate("type")
    res.json(docs)
  } catch (err) {
    next(err)
  }
}
