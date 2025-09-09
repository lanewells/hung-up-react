import Type from "../models/Type.js"

export async function getAllTypes(_req, res, next) {
  try {
    const docs = await Type.find()
    res.json(docs)
  } catch (err) {
    next(err)
  }
}
