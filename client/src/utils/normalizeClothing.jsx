export function normalizeClothing(doc) {
  return {
    ...doc,
    id: String(doc._id),
    typeName: doc.type && typeof doc.type === "object" ? doc.type.name : null
  }
}
