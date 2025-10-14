import { useMemo } from "react"
import { useParams, useNavigate, useLocation, Link } from "react-router-dom"
import { useOutfit } from "../hooks/useOutfit"
import { useDeleteOutfit } from "../hooks/useOutfitMutations"
import classes from "../styles/OutfitDetailPage.module.scss"

function FavoriteHeart({ isFav }) {
  return (
    <span
      aria-label={isFav ? "favorite" : "not favorite"}
      title={isFav ? "Favorite" : "Not favorite"}
      style={{ fontSize: 24, lineHeight: 1 }}
    >
      {/* TODO: create FavoriteHeart component */}
      {isFav ? "❤️" : "🩶"}
    </span>
  )
}

export default function OutfitDetailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const { data: outfit, isLoading, error } = useOutfit(id)
  const backTo = location.state?.from?.pathname || "/outfits"
  const { mutateAsync: deleteOutfit, isPending } = useDeleteOutfit()

  const items = useMemo(() => {
    return Array.isArray(outfit?.items)
      ? outfit.items.map((it) => {
          const isObj = it && typeof it === "object"
          return {
            id: isObj ? it.id || it._id : String(it),
            name: isObj ? it.name ?? "" : "",
            imageUrl: isObj ? it.imageUrl ?? "" : ""
          }
        })
      : []
  }, [outfit])

  const handleBack = () => navigate(backTo)
  const handleEdit = () => navigate(`/outfits/${id}/edit`)

  const handleDelete = async () => {
    if (!window.confirm("Delete this outfit?")) return
    await deleteOutfit(id)
    navigate("/outfits")
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
  if (!outfit)
    return (
      <main className={classes.container}>
        <p>not found</p>
      </main>
    )

  const cover = outfit.imageUrl || "/placeholder-img.jpg"

  return (
    <main id={classes.outfitDetailSection}>
      <div className={classes.container}>
        <div className={classes.outfitHeader}>
          <h2>{outfit.title}</h2>
          <FavoriteHeart isFav={!!outfit.favorite} />
        </div>

        <div className={classes.outfitDetails}>
          <div className={classes.imageContainer}>
            <img
              src={cover}
              alt={outfit.title}
              className={classes.outfitImage}
            />
          </div>

          <div className={classes.detailsContainer}>
            <div className={classes.meta}>
              <div>
                <p className={classes.value}>{outfit.occasion || "—"}</p>
                <p className={classes.label}>OCCASION</p>
              </div>
              <div>
                <p className={classes.value}>{outfit.weather || "—"}</p>
                <p className={classes.label}>WEATHER</p>
              </div>
              <div>
                <p className={classes.value}>{items.length}</p>
                <p className={classes.label}>ITEMS</p>
              </div>
            </div>

            <section className={classes.clothingPiecesSection}>
              <h3 className={classes.sectionTitle}>Items in this outfit</h3>
              <div className={classes.outfitItemsGrid}>
                {items.map((c) => (
                  <Link
                    key={c.id}
                    to={`/clothes/${c.id}`}
                    className={classes.outfitItemCard}
                  >
                    <div
                      className={classes.thumb}
                      style={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        overflow: "hidden",
                        borderRadius: 10,
                        background: "#f3f3f3",
                        display: "grid",
                        placeItems: "center"
                      }}
                    >
                      <img
                        src={c.imageUrl || "/placeholder-img.jpg"}
                        alt={c.name || "Clothing item"}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                    </div>
                    <span style={{ color: "inherit" }}>{c.name || "—"}</span>
                  </Link>
                ))}
                {items.length === 0 && <p>No items yet.</p>}
              </div>
            </section>

            <div
              className={classes.actions}
              style={{ display: "flex", gap: 8, marginTop: 8 }}
            >
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
                type="button"
                className={classes.btnSec}
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
