import { useMemo, useState, useEffect, useCallback } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { useClothing } from "../hooks/useClothes"

function StarRating({ label, value, onChange }) {
  return (
    <div className="rating">
      <p>
        <strong>{label}:</strong>
      </p>
      <div className="stars" role="radiogroup" aria-label={`${label} rating`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            onClick={() => onChange(n)}
            className={`star ${n <= value ? "is-active" : ""}`}
            title={`${label} ${n} star${n > 1 ? "s" : ""}`}
          >
            {/* TODO: create StarRating component */}
            {n <= value ? "★" : "☆"}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ClothingDetailPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const { id } = useParams()
  const { data: clothing, isLoading, error } = useClothing(id)

  const storageKey = useMemo(() => `ratings:clothing:${id}`, [id])

  const [ratings, setRatings] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) return JSON.parse(saved)
    } catch {}
    return { comfort: 0, confidence: 0, warmth: 0 }
  })

  useEffect(() => {
    if (!clothing) return
    const saved = localStorage.getItem(storageKey)
    if (!saved && clothing.ratings) {
      const seeded = {
        comfort: clothing.ratings.comfort ?? 0,
        confidence: clothing.ratings.confidence ?? 0,
        warmth: clothing.ratings.warmth ?? 0
      }
      setRatings(seeded)
      localStorage.setItem(storageKey, JSON.stringify(seeded))
    }
  }, [clothing, storageKey])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(ratings))
  }, [ratings, storageKey])

  const setRating = useCallback(
    (key, val) => setRatings((r) => ({ ...r, [key]: val })),
    []
  )
  const backTo = location.state?.from?.pathname || "/clothes"

  const handleBack = () => navigate(backTo)
  const handleEdit = () => {
    // TODO: route to edit form / open modal
    console.log("Edit clicked", id)
  }
  const handleDelete = async () => {
    // TODO: await api.deleteClothing(id); navigate("/clothes")
    console.log("Delete clicked", id)
  }

  if (isLoading)
    return (
      <main className="container">
        <p>loading…</p>
      </main>
    )
  if (error)
    return (
      <main className="container">
        <p>error: {error.message}</p>
      </main>
    )
  if (!clothing)
    return (
      <main className="container">
        <p>not found</p>
      </main>
    )

  const typeName =
    clothing.type?.name ??
    clothing.typeName ??
    (typeof clothing.type === "string" ? clothing.type : "Unknown")

  const colorsText = Array.isArray(clothing.colors)
    ? clothing.colors.join(", ")
    : clothing.colors || "Unknown"

  return (
    <main id="clothing-detail-section">
      <div className="container">
        <h2 className="item-name">{clothing.name}</h2>

        <div className="clothing-details">
          <div className="image-container">
            <img
              src={clothing.imageUrl || "/placeholder-img.jpg"}
              alt={clothing.name || "Clothing item"}
              className="clothing-image"
            />
          </div>

          <div className="details-container">
            <div className="details-info">
              <div>
                <p className="value">{typeName || "Unknown"}</p>
                <p className="label">TYPE</p>
              </div>
              <div>
                <p className="value">{clothing.subtype || "Unknown"}</p>
                <p className="label">STYLE</p>
              </div>
              <div>
                <p className="value">{colorsText}</p>
                <p className="label">COLOR</p>
              </div>
              <div>
                <p className="value">{clothing.size || "Unknown"}</p>
                <p className="label">SIZE</p>
              </div>
            </div>

            <div className="ratings">
              <StarRating
                label="Comfort"
                value={ratings.comfort}
                onChange={(v) => setRating("comfort", v)}
              />
              <StarRating
                label="Confidence"
                value={ratings.confidence}
                onChange={(v) => setRating("confidence", v)}
              />
              <StarRating
                label="Warmth"
                value={ratings.warmth}
                onChange={(v) => setRating("warmth", v)}
              />
            </div>

            <div className="actions">
              <button type="button" className="btn" onClick={handleBack}>
                Go back
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
