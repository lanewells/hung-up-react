export function normalizeOutfit(doc) {
  return {
    ...doc,
    id: String(doc._id),
    items: Array.isArray(doc.items)
      ? doc.items.map((it) => ({
          id: it && it._id ? String(it._id) : String(it),
          name: it && typeof it === "object" ? it.name ?? null : null,
          imageUrl: it && typeof it === "object" ? it.imageUrl ?? null : null
        }))
      : []
  }
}
