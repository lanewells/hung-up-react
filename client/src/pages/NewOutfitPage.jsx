import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCreateOutfit } from "../hooks/useOutfitMutations"
import { useClothes } from "../hooks/useClothes"

export default function NewOutfitPage() {
  const navigate = useNavigate()
  const {
    data: clothes = [],
    isLoading: clothesLoading,
    error: clothesError
  } = useClothes()
  const {
    mutateAsync: createOutfit,
    isPending,
    error: createError
  } = useCreateOutfit()

  const [form, setForm] = useState({
    title: "",
    imageUrl: "/placeholder.jpg",
    occasion: "",
    weather: "",
    favorite: false
  })
  const [selectedIds, setSelectedIds] = useState([])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }))
  }

  const canSubmit = useMemo(
    () => form.title.trim() && !isPending,
    [form.title, isPending]
  )

  const toggleSelected = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      title: form.title.trim(),
      imageUrl: form.imageUrl || "/placeholder.jpg",
      occasion: form.occasion || "",
      weather: form.weather || "",
      favorite: !!form.favorite,
      items: selectedIds.map(String)
    }

    const created = await createOutfit(payload)
    const newId = created.id || created._id
    navigate(`/outfits/${newId}`, {
      replace: true,
      state: { from: { pathname: "/outfits" } }
    })
  }

  if (clothesLoading) return <p>loading clothes…</p>
  if (clothesError) return <p>error: {clothesError.message}</p>

  return (
    <main className="container">
      <h2>New Outfit</h2>

      <form
        onSubmit={onSubmit}
        style={{ display: "grid", gap: 16, maxWidth: 800 }}
      >
        <label>
          Title
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12
          }}
        >
          <label>
            Image URL
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="/placeholder.jpg"
            />
          </label>
          <label>
            Occasion
            <input
              name="occasion"
              value={form.occasion}
              onChange={handleChange}
              placeholder="Outdoor Bonfire"
            />
          </label>
          <label>
            Weather
            <input
              name="weather"
              value={form.weather}
              onChange={handleChange}
              placeholder="Starry, Cool, Evening"
            />
          </label>
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            name="favorite"
            checked={form.favorite}
            onChange={handleChange}
          />
          Favorite
        </label>

        <section>
          <h3 style={{ margin: "8px 0 12px" }}>Pick items to include</h3>

          <div
            style={{
              display: "grid",
              gap: 12,
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))"
            }}
          >
            {clothes.map((c) => {
              const id = String(c.id || c._id)
              const selected = selectedIds.includes(id)
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleSelected(id)}
                  style={{
                    textAlign: "left",
                    border: selected ? "2px solid #444" : "1px solid #e5e5e5",
                    borderRadius: 10,
                    padding: 8,
                    background: selected ? "#fafafa" : "white",
                    cursor: "pointer"
                  }}
                  aria-pressed={selected}
                >
                  <div
                    style={{
                      aspectRatio: "1/1",
                      overflow: "hidden",
                      borderRadius: 8,
                      background: "#f5f5f5"
                    }}
                  >
                    <img
                      src={c.imageUrl || "/placeholder.jpg"}
                      alt={c.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 8
                    }}
                  >
                    <span style={{ fontSize: 14 }}>{c.name}</span>
                    {selected ? (
                      <span>✓</span>
                    ) : (
                      <span style={{ opacity: 0.4 }}>＋</span>
                    )}
                  </div>
                </button>
              )
            })}
            {clothes.length === 0 && <p>No clothing yet. Add some first.</p>}
          </div>
        </section>

        {createError && (
          <p style={{ color: "crimson" }}>
            {createError.message || "Failed to create outfit."}
          </p>
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" disabled={!canSubmit}>
            {isPending ? "Saving…" : "Create"}
          </button>
        </div>
      </form>
    </main>
  )
}
