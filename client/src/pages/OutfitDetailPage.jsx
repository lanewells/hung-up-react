import { useParams, useNavigate, Link } from "react-router-dom"
import { useOutfit } from "../hooks/useOutfit"
import { useMemo } from "react"

function FavoriteHeart({ isFav }) {
  return (
    <span
      aria-label={isFav ? "favorite" : "not favorite"}
      title={isFav ? "Favorite" : "Not favorite"}
      style={{ fontSize: 24, lineHeight: 1 }}
    >
      {/* TODO: create FavoriteHeart component */}
      {isFav ? "❤️" : "🤍"}
    </span>
  )
}

export default function OutfitDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: outfit, isLoading, error } = useOutfit(id)

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

  const handleBack = () => navigate(-1)
  const handleEdit = () => {
    // TODO: route to edit form / open modal
    console.log("Edit outfit", id)
  }
  const handleDelete = () => {
    // TODO: await api.deleteOutfit(id); navigate("/outfits")
    console.log("Delete outfit", id)
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
  if (!outfit)
    return (
      <main className="container">
        <p>not found</p>
      </main>
    )

  const cover = outfit.imageUrl || "/placeholder-img.jpg"

  return (
    <main id="outfit-detail-section">
      <div className="container">
        <header
          className="outfit-header"
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <h2 style={{ margin: 0 }}>{outfit.title}</h2>
          <FavoriteHeart isFav={!!outfit.favorite} />
        </header>

        <div
          className="outfit-details"
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 24,
            alignItems: "start",
            marginTop: 16
          }}
        >
          <div className="image-container">
            <img
              src={cover}
              alt={outfit.title}
              className="outfit-image"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 12,
                objectFit: "cover"
              }}
            />
          </div>

          <div
            className="details-container"
            style={{ display: "grid", gap: 16 }}
          >
            <div
              className="meta"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 12
              }}
            >
              <div>
                <p className="value">{outfit.occasion || "—"}</p>
                <p className="label">OCCASION</p>
              </div>
              <div>
                <p className="value">{outfit.weather || "—"}</p>
                <p className="label">WEATHER</p>
              </div>
              <div>
                <p className="value">{items.length}</p>
                <p className="label">ITEMS</p>
              </div>
            </div>

            <section>
              <h3 style={{ margin: "8px 0 12px" }}>Items in this outfit</h3>
              <div
                className="outfit-items-grid"
                style={{
                  display: "grid",
                  gap: 12,
                  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))"
                }}
              >
                {items.map((c) => (
                  <Link
                    key={c.id}
                    to={`/clothes/${c.id}`}
                    className="outfit-item-card"
                    style={{
                      display: "grid",
                      gap: 8,
                      textDecoration: "none"
                    }}
                  >
                    <div
                      className="thumb"
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
              className="actions"
              style={{ display: "flex", gap: 8, marginTop: 8 }}
            >
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
