export function normalizeType(doc) {
  return {
    ...doc,
    id: String(doc._id)
  }
}
