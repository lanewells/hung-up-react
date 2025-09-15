import Type from "../models/Type.js"

// Read routes

// GET all types
export async function listTypes(_req, res, next) {
  try {
    const docs = await Type.find()
    res.json(docs)
  } catch (err) {
    next(err)
  }
}

// GET /types/:id
export async function getType(req, res, next) {
  try {
    const doc = await Type.findById(req.params.id)
    if (!doc) return res.status(404).json({ error: "Not found" })
    res.json(doc)
  } catch (err) {
    next(err)
  }
}

// Create route

// POST /types
export async function createType(req, res, next) {
  try {
    const doc = await Type.create(req.body)
    res.status(201).json(doc)
  } catch (err) {
    next(err)
  }
}

// Update route

// PUT /types/:id
export async function updateType(req, res, next) {
  try {
    const doc = await Type.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      overwrite: true
    })
    if (!doc) return res.status(404).json({ error: "Not found" })
    res.json(doc)
  } catch (err) {
    next(err)
  }
}

// Delete route

// DELETE /types/:id
export async function deleteType(req, res, next) {
  try {
    const doc = await Type.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ error: "Not found" })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
