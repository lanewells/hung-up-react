import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useClothing } from "../hooks/useClothes"
import { useTypes } from "../hooks/useTypes"
import { useUpdateClothing } from "../hooks/useMutations"

export default function EditClothingPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const {
    data: clothing,
    isLoading: clothingLoading,
    error: clothingError
  } = useClothing(id)
  const {
    data: types = [],
    isLoading: typesLoading,
    error: typesError
  } = useTypes()
  const {
    mutateAsync: updateClothing,
    isPending,
    error: updateError
  } = useUpdateClothing()

  const [form, setForm] = useState({
    name: "",
    type: "",
    imageUrl: "",
    subtype: "",
    colors: "",
    size: "",
    waterproof: false,
    workAppropriate: false
  })

  useEffect(() => {
    if (!clothing) return
    setForm({
      name: clothing.name || "",
      type: clothing.type?._id || clothing.type || "",
      imageUrl: clothing.imageUrl || "/placeholder.jpg",
      subtype: clothing.subtype || "",
      colors: Array.isArray(clothing.colors)
        ? clothing.colors.join(", ")
        : clothing.colors || "",
      size: clothing.size || "",
      waterproof: !!clothing.waterproof,
      workAppropriate: !!clothing.workAppropriate
    })
  }, [clothing])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }))
  }

  const canSubmit = useMemo(
    () => form.name.trim() && form.type && !isPending,
    [form.name, form.type, isPending]
  )

  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      name: form.name.trim(),
      type: form.type,
      imageUrl: form.imageUrl || "/placeholder.jpg",
      subtype: form.subtype || undefined,
      colors: form.colors
        ? form.colors
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      size: form.size || undefined,
      waterproof: !!form.waterproof,
      workAppropriate: !!form.workAppropriate
    }

    const updated = await updateClothing({ id, data: payload })
    const newId = updated.id || updated._id || id
    navigate(`/clothes/${newId}`, {
      replace: true,
      state: { from: { pathname: "/clothes" } }
    })
  }

  if (clothingLoading || typesLoading) return <p>loading…</p>
  if (clothingError) return <p>error: {clothingError.message}</p>
  if (typesError) return <p>error: {typesError.message}</p>
  if (!clothing) return <p>not found</p>

  return (
    <main className="container">
      <h2>Edit Clothing</h2>

      <form
        onSubmit={onSubmit}
        style={{ display: "grid", gap: 12, maxWidth: 560 }}
      >
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Type
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="">Select a type…</option>
            {types.map((t) => (
              <option key={t.id || t._id} value={t.id || t._id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Subtype
          <input
            name="subtype"
            value={form.subtype}
            onChange={handleChange}
            placeholder="e.g., T-shirt, Bermuda"
          />
        </label>

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
          Colors (comma-sep)
          <input
            name="colors"
            value={form.colors}
            onChange={handleChange}
            placeholder="Blue, Black"
          />
        </label>

        <label>
          Size
          <input
            name="size"
            value={form.size}
            onChange={handleChange}
            placeholder="S / M / L / 30x30"
          />
        </label>

        <label>
          <input
            type="checkbox"
            name="waterproof"
            checked={form.waterproof}
            onChange={handleChange}
          />
          Waterproof
        </label>

        <label>
          <input
            type="checkbox"
            name="workAppropriate"
            checked={form.workAppropriate}
            onChange={handleChange}
          />
          Work appropriate
        </label>

        {updateError && (
          <p style={{ color: "crimson" }}>
            {updateError.message || "Failed to update clothing."}
          </p>
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" disabled={!canSubmit}>
            {isPending ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </main>
  )
}
