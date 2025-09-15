import Outfit from "../models/Outfit.js"

// Read routes

// GET /outfits
export async function listOutfits(_req, res, next) {
  try {
    const docs = await Outfit.find().populate("items")
    res.json(docs)
  } catch (err) {
    next(err)
  }
}

// GET /outfits/:id
export async function getOutfit(req, res, next) {
  try {
    const doc = await Outfit.findById(req.params.id).populate("items")
    if (!doc) return res.status(404).json({ error: "Not found" })
    res.json(doc)
  } catch (err) {
    next(err)
  }
}

// Create route

// POST /outfits
export async function createOutfit(req, res, next) {
  try {
    const doc = await Outfit.create(req.body)
    const withItems = await doc.populate("items")
    res.status(201).json(withItems)
  } catch (err) {
    next(err)
  }
}

// Update route

// PUT /outfits/:id
export async function updateOutfit(req, res, next) {
  try {
    const doc = await Outfit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      overwrite: true
    }).populate("items")
    if (!doc) return res.status(404).json({ error: "Not found" })
    res.json(doc)
  } catch (err) {
    next(err)
  }
}

// Delete route

// DELETE /outfits/:id
export async function deleteOutfit(req, res, next) {
  try {
    const doc = await Outfit.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ error: "Not found" })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
