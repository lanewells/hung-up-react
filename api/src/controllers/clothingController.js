import Clothing from "../models/Clothing.js"

export async function getAllClothes(_req, res, next) {
  try {
    const docs = await Clothing.find()
    res.json(docs)
  } catch (err) {
    next(err)
  }
}
