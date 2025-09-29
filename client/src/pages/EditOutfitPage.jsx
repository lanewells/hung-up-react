import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useOutfit } from "../hooks/useOutfit"
import { useClothes } from "../hooks/useClothes"
import { useUpdateOutfit } from "../hooks/useOutfitMutations"

export default function EditOutfitPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const {
    data: outfit,
    isLoading: outfitLoading,
    error: outfitError
  } = useOutfit(id)
  const {
    data: clothes = [],
    isLoading: clothesLoading,
    error: clothesError
  } = useClothes()
  const {
    mutateAsync: updateOutfit,
    isPending,
    error: updateError
  } = useUpdateOutfit()

  const [form, setForm] = useState({
    title: "",
    imageUrl: "/placeholder-img.jpg",
    occasion: "",
    weather: "",
    favorite: false
  })
  const [selectedIds, setSelectedIds] = useState([])

  useEffect(() => {
    if (!outfit) return
    setForm({
      title: outfit.title || "",
      imageUrl: outfit.imageUrl || "/placeholder-img.jpg",
      occasion: outfit.occasion || "",
      weather: outfit.weather || "",
      favorite: !!outfit.favorite
    })
    const ids = Array.isArray(outfit.items)
      ? outfit.items.map((it) => it?.id || it?._id || String(it))
      : []
    setSelectedIds(ids)
  }, [outfit])

  const clothesById = useMemo(() => {
    const m = new Map()
    for (const c of clothes) m.set(String(c.id || c._id), c)
    return m
  }, [clothes])

  const selectedItems = useMemo(
    () => selectedIds.map((cid) => clothesById.get(String(cid)) || { id: cid }),
    [selectedIds, clothesById]
  )

  const availableToAdd = useMemo(() => {
    const chosen = new Set(selectedIds.map(String))
    return clothes.filter((c) => !chosen.has(String(c.id || c._id)))
  }, [clothes, selectedIds])

  const [addPicker, setAddPicker] = useState("")
  const handleAdd = () => {
    if (!addPicker) return
    setSelectedIds((prev) =>
      prev.includes(addPicker) ? prev : [...prev, addPicker]
    )
    setAddPicker("")
  }

  const handleRemove = (cid) => {
    setSelectedIds((prev) => prev.filter((x) => String(x) !== String(cid)))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      title: form.title.trim(),
      imageUrl: form.imageUrl || "/placeholder-img.jpg",
      occasion: form.occasion || "",
      weather: form.weather || "",
      favorite: !!form.favorite,
      items: selectedIds.map(String)
    }
    const updated = await updateOutfit({ id, data: payload })
    const newId = updated.id || updated._id || id
    navigate(`/outfits/${newId}`, {
      replace: true,
      state: { from: { pathname: "/outfits" } }
    })
  }

  if (outfitLoading || clothesLoading) return <p>loading…</p>
  if (outfitError) return <p>error: {outfitError.message}</p>
  if (clothesError) return <p>error: {clothesError.message}</p>
  if (!outfit) return <p>not found</p>

  return (
    <main className="container">
      <h2>Edit Outfit</h2>

      <form
        onSubmit={onSubmit}
        style={{ display: "grid", gap: 16, maxWidth: 720 }}
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

        <label>
          Image URL
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="/placeholder-img.jpg"
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
            Occasion
            <input
              name="occasion"
              value={form.occasion}
              onChange={handleChange}
            />
          </label>
          <label>
            Weather
            <input
              name="weather"
              value={form.weather}
              onChange={handleChange}
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              name="favorite"
              checked={form.favorite}
              onChange={handleChange}
            />
            Favorite
          </label>
        </div>

        <section>
          <h3 style={{ margin: "8px 0 12px" }}>Items in this outfit</h3>

          <div
            style={{
              display: "grid",
              gap: 12,
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))"
            }}
          >
            {selectedItems.map((c) => {
              const cid = String(c.id || c._id)
              const name = c.name || "(unknown)"
              const imageUrl = c.imageUrl || "/placeholder-img.jpg"
              return (
                <div
                  key={cid}
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: 10,
                    padding: 8
                  }}
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
                      src={imageUrl}
                      alt={name}
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
                    <span style={{ fontSize: 14 }}>{name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemove(cid)}
                      aria-label={`Remove ${name}`}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )
            })}
            {selectedItems.length === 0 && <p>No items selected.</p>}
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <select
              value={addPicker}
              onChange={(e) => setAddPicker(e.target.value)}
            >
              <option value="">Add an item…</option>
              {availableToAdd.map((c) => (
                <option key={c.id || c._id} value={c.id || c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAdd} disabled={!addPicker}>
              Add
            </button>
          </div>
        </section>

        {updateError && (
          <p style={{ color: "crimson" }}>
            {updateError.message || "Failed to update outfit."}
          </p>
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" disabled={isPending}>
            {isPending ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </main>
  )
}
