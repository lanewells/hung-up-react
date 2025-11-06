import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCreateOutfit } from "../hooks/useOutfitMutations"
import { useClothes } from "../hooks/useClothes"
import ImagePicker from "../components/ImagePicker"
import { useConfirm } from "../components/ConfirmProvider"
import classes from "../styles/OutfitForms.module.scss"

export default function NewOutfitPage() {
  const navigate = useNavigate()
  const confirm = useConfirm()

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
    imageUrl: "",
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

    const ok = await confirm()
    if (!ok) return

    const payload = {
      title: form.title.trim(),
      imageUrl: form.imageUrl || "/placeholder-img.jpg",
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
    <main>
      <div className={classes.container}>
        <h2 className={classes.title}>New Outfit</h2>

        <div className={classes.formContainer}>
          <form className={classes.form} onSubmit={onSubmit}>
            <div className={classes.beigeBackground}>
              <div className={classes.labelsContainer}>
                <label>
                  <span className={classes.labelText}>Title</span>
                  <input
                    className={classes.input}
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  <span className={classes.labelText}>Occasion</span>
                  <input
                    className={classes.input}
                    name="occasion"
                    value={form.occasion}
                    onChange={handleChange}
                    placeholder="Outdoor Bonfire"
                  />
                </label>
                <label>
                  <span className={classes.labelText}>Weather</span>
                  <input
                    className={classes.input}
                    name="weather"
                    value={form.weather}
                    onChange={handleChange}
                    placeholder="Starry, Cool, Evening"
                  />
                </label>

                <label className={classes.label}>
                  <input
                    className={classes.checkbox}
                    type="checkbox"
                    name="favorite"
                    checked={form.favorite}
                    onChange={handleChange}
                  />
                  <span className={classes.checkboxLabel}>Favorite</span>
                </label>

                <label className={classes.imagePicker}>
                  <span className={classes.labelText}>Image</span>
                  <ImagePicker
                    uploadType="outfit"
                    initialUrl={form.imageUrl}
                    onUploaded={(url) =>
                      setForm((p) => ({ ...p, imageUrl: url }))
                    }
                  />
                </label>
              </div>
            </div>

            <section className={classes.selectItemsSection}>
              <h3>Pick items to include</h3>

              <div className={classes.grid}>
                {clothes.map((c) => {
                  const id = String(c.id || c._id)
                  const selected = selectedIds.includes(id)
                  return (
                    <button
                      className={classes.btnSelection}
                      key={id}
                      type="button"
                      onClick={() => toggleSelected(id)}
                      style={{
                        border: selected
                          ? "2px solid #444"
                          : "1px solid #e5e5e5",
                        background: selected ? "#fafafa" : "white"
                      }}
                      aria-pressed={selected}
                    >
                      <div className={classes.thumb}>
                        <img
                          src={c.imageUrl || "/placeholder-img.jpg"}
                          alt={c.name}
                        />
                      </div>
                      <div className={classes.imageDescription}>
                        <span>{c.name}</span>
                        {selected ? (
                          <span>✓</span>
                        ) : (
                          <span style={{ opacity: 0.4 }}>＋</span>
                        )}
                      </div>
                    </button>
                  )
                })}
                {clothes.length === 0 && (
                  <p>No clothing yet. Add some first.</p>
                )}
              </div>
            </section>

            {createError && (
              <p style={{ color: "crimson" }}>
                {createError.message || "Failed to create outfit."}
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
