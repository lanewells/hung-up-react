import { useMemo, useState, useEffect, useCallback } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { useClothing } from "../hooks/useClothes"
import { useDeleteClothing } from "../hooks/useMutations"
import { useConfirm } from "../components/ConfirmProvider"
import classes from "../styles/ClothingDetailPage.module.scss"

function StarRating({ label, value, onChange }) {
  return (
    <div className={classes.rating}>
      <p>{label}:</p>
      <div
        className={classes.stars}
        role="radiogroup"
        aria-label={`${label} rating`}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            onClick={() => onChange(n)}
            className={n <= value ? classes.starActive : classes.star}
            title={`${label} ${n} star${n > 1 ? "s" : ""}`}
          >
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
  const { mutateAsync: deleteClothing, isPending } = useDeleteClothing()
  const confirm = useConfirm()

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
  const handleEdit = () => navigate(`/clothes/${id}/edit`)

  const handleDelete = async () => {
    const ok = await confirm({
      title: "Delete from shared demo?",
      message:
        "You're about to change the live demo for everyone. Bold move. Continue?",
      confirmText: "Delete",
      cancelText: "Cancel"
    })
    if (!ok) return
    await deleteClothing(id)
    navigate("/clothes")
  }

  if (isLoading)
    return (
      <main className={classes.container}>
        <p>loading…</p>
      </main>
    )
  if (error)
    return (
      <main className={classes.container}>
        <p>error: {error.message}</p>
      </main>
    )
  if (!clothing)
    return (
      <main className={classes.container}>
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
    <main>
      <div className={classes.container}>
        <h2 className={classes.itemName}>{clothing.name}</h2>

        <div className={classes.clothingDetails}>
          <div className={classes.imageContainer}>
            <img
              src={clothing.imageUrl || "/placeholder-img.jpg"}
              alt={clothing.name || "Clothing item"}
              className={classes.clothingImage}
            />
          </div>

          <div className={classes.detailsContainer}>
            <div className={classes.beigeBackground}>
              <div className={classes.detailsInfo}>
                <div>
                  <p className={classes.value}>{typeName || "Unknown"}</p>
                  <p className={classes.label}>TYPE</p>
                </div>
                <div>
                  <p className={classes.value}>
                    {clothing.subtype || "Unknown"}
                  </p>
                  <p className={classes.label}>STYLE</p>
                </div>
                <div>
                  <p className={classes.value}>{colorsText}</p>
                  <p className={classes.label}>COLOR</p>
                </div>
                <div>
                  <p className={classes.value}>{clothing.size || "Unknown"}</p>
                  <p className={classes.label}>SIZE</p>
                </div>
              </div>

              <div className={classes.ratings}>
                <StarRating
                  label="WARMTH"
                  value={ratings.comfort}
                  onChange={(v) => setRating("comfort", v)}
                />
                <StarRating
                  label="COMFORT"
                  value={ratings.confidence}
                  onChange={(v) => setRating("confidence", v)}
                />
                <StarRating
                  label="CONFIDENCE"
                  value={ratings.warmth}
                  onChange={(v) => setRating("warmth", v)}
                />
              </div>
            </div>

            <div className={classes.actions}>
              <button
                type="button"
                className={classes.btnPri}
                onClick={handleBack}
              >
                Go back
              </button>
              <button
                type="button"
                className={classes.btnPri}
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className={classes.btnSec}
              >
                {isPending ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
