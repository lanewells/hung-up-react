import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import { useCreateClothing } from "../hooks/useMutations"
import { useTypes } from "../hooks/useTypes"
import classes from "../styles/NewClothingPage.module.scss"

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
    <main>
      <div className={classes.container}>
        <h2 className={classes.title}>New Clothing</h2>

        <div className={classes.formContainer}>
          <form className={classes.form} onSubmit={onSubmit}>
            <div className={classes.beigeBackground}>
              <div className={classes.labelsContainer}>
                <label>
                  <span className={classes.labelText}>Name</span>
                  <input
                    className={classes.input}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  <span className={classes.labelText}>Type</span>
                  <select
                    className={classes.dropdownText}
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a type…</option>
                    {types.map((t) => (
                      <option key={t.id || t._id} value={t.id || t._id}>
                        <span>{t.name}</span>
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className={classes.labelText}>Subtype</span>
                  <input
                    className={classes.input}
                    name="subtype"
                    value={form.subtype}
                    onChange={handleChange}
                    placeholder="T-shirt, Bermuda"
                  />
                </label>

                <label>
                  <span className={classes.labelText}>Image URL</span>
                  <input
                    className={classes.input}
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="/placeholder-img.jpg"
                  />
                </label>

                <label>
                  <span className={classes.labelText}>Colors</span>
                  <input
                    className={classes.input}
                    name="colors"
                    value={form.colors}
                    onChange={handleChange}
                    placeholder="Blue, Black"
                  />
                </label>

                <label>
                  <span className={classes.labelText}>Size</span>
                  <input
                    className={classes.input}
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    placeholder="S / M / L / 30x30"
                  />
                </label>

                <label className={classes.label}>
                  <input
                    className={classes.checkbox}
                    type="checkbox"
                    name="waterproof"
                    checked={form.waterproof}
                    onChange={handleChange}
                  />
                  <span className={classes.checkboxLabel}>Waterproof</span>
                </label>

                <label className={classes.label}>
                  <input
                    className={classes.checkbox}
                    type="checkbox"
                    name="workAppropriate"
                    checked={form.workAppropriate}
                    onChange={handleChange}
                  />
                  <span className={classes.checkboxLabel}>
                    Work appropriate
                  </span>
                </label>
              </div>
            </div>

            {createError && (
              <p style={{ color: "crimson" }}>
                {createError.message || "Failed to create clothing."}
              </p>
            )}

            <div className={classes.actions}>
              <button
                className={classes.btnSec}
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                className={classes.btnPri}
                type="submit"
                disabled={!canSubmit}
              >
                {isPending ? "Saving…" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
