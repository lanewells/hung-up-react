import Outfit from "../models/Outfit.js"

export async function getAllOutfits(_req, res, next) {
  try {
    const docs = await Outfit.find().populate("items")
    res.json(docs)
  } catch (err) {
    next(err)
  }
}
