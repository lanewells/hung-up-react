import Clothing from "../models/Clothing.js"

// Read routes

// GET all clothes
export async function listClothes(_req, res, next) {
  try {
    const docs = await Clothing.find().populate("type")
    res.json(docs)
  } catch (err) {
    next(err)
  }
}

// GET /clothes/:id
export async function getClothing(req, res, next) {
  try {
    const doc = await Clothing.findById(req.params.id).populate("type")
    if (!doc) return res.status(404).json({ error: "Not found" })
    res.json(doc)
  } catch (err) {
    next(err)
  }
}

// Create route

// POST /clothes
export async function createClothing(req, res, next) {
  try {
    const doc = await Clothing.create(req.body)
    const withType = await doc.populate("type")
    res.status(201).json(withType)
  } catch (err) {
    next(err)
  }
}

// Update route

// PUT /clothes/:id
export async function updateClothing(req, res, next) {
  try {
    const doc = await Clothing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      overwrite: true
    }).populate("type")
    if (!doc) return res.status(404).json({ error: "Not found" })
    res.json(doc)
  } catch (err) {
    next(err)
  }
}

// Delete route

// DELETE /api/clothes/:id
export async function deleteClothing(req, res, next) {
  try {
    const doc = await Clothing.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ error: "Not found" })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
