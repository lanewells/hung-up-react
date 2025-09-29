import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { useCreateClothing } from "../hooks/useMutations"
import { useTypes } from "../hooks/useTypes"

export default function NewClothingPage() {
  const navigate = useNavigate()

  const {
    data: types = [],
    isLoading: typesLoading,
    error: typesError
  } = useTypes()

  const {
    mutateAsync: createClothing,
    isPending,
    error: createError
  } = useCreateClothing()

  const [form, setForm] = useState({
    name: "",
    type: "",
    imageUrl: "",
    subtype: "",
    colors: "",
    size: "",
    comfort: 0,
    confidence: 0,
    warmth: 0,
    waterproof: false,
    workAppropriate: false
  })

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
      imageUrl: form.imageUrl || "/placeholder-img.jpg",
      subtype: form.subtype || undefined,
      colors: form.colors
        ? form.colors
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      size: form.size || undefined,
      ratings: {
        comfort: Number(form.comfort) || 0,
        confidence: Number(form.confidence) || 0,
        warmth: Number(form.warmth) || 0
      },
      waterproof: !!form.waterproof,
      workAppropriate: !!form.workAppropriate
    }

    const created = await createClothing(payload)

    const newId = created.id || created._id

    // smart redirect
    navigate(`/clothes/${newId}`, {
      replace: true,
      state: { from: { pathname: "/clothes" } }
    })
  }

  if (typesLoading) return <p>loading types…</p>
  if (typesError) return <p>error: {typesError.message}</p>

  return (
    <main className="container">
      <h2>New Clothing</h2>

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
            placeholder="/placeholder-img.jpg"
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

        <fieldset
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8
          }}
        >
          <label>
            Comfort
            <input
              type="number"
              name="comfort"
              min="0"
              max="5"
              value={form.comfort}
              onChange={handleChange}
            />
          </label>
          <label>
            Confidence
            <input
              type="number"
              name="confidence"
              min="0"
              max="5"
              value={form.confidence}
              onChange={handleChange}
            />
          </label>
          <label>
            Warmth
            <input
              type="number"
              name="warmth"
              min="0"
              max="5"
              value={form.warmth}
              onChange={handleChange}
            />
          </label>
        </fieldset>

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

        {createError && (
          <p style={{ color: "crimson" }}>
            {createError.message || "Failed to create clothing."}
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
