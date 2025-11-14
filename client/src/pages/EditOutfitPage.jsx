import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useOutfit } from "../hooks/useOutfit"
import { useClothes } from "../hooks/useClothes"
import { useUpdateOutfit } from "../hooks/useOutfitMutations"
import ImagePicker from "../components/ImagePicker"
import { useConfirm } from "../components/ConfirmProvider"
import PageMessage from "../components/PageMessage"
import classes from "../styles/OutfitForms.module.scss"

export default function EditOutfitPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const confirm = useConfirm()

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
    imageUrl: "",
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
    const updated = await updateOutfit({ id, data: payload })
    const newId = updated.id || updated._id || id
    navigate(`/outfits/${newId}`, {
      replace: true,
      state: { from: { pathname: "/outfits" } }
    })
  }

  if (outfitLoading || clothesLoading) return <PageMessage text="Loading..." />
  if (outfitError) return <PageMessage text={`error: ${outfitError.message}`} />
  if (clothesError)
    return <PageMessage text={`error: ${clothesError.message}`} />
  if (!outfit) return <PageMessage text="Not found" />

  return (
    <main id="edit-outfit-page">
      <div className={classes.container}>
        <h2 className={classes.title}>Edit Outfit</h2>

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
                  />
                </label>

                <label>
                  <span className={classes.labelText}>Weather</span>
                  <input
                    className={classes.input}
                    name="weather"
                    value={form.weather}
                    onChange={handleChange}
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
              <h3>Items in this outfit</h3>

              <div className={classes.grid}>
                {selectedItems.map((c) => {
                  const cid = String(c.id || c._id)
                  const name = c.name || "(unknown)"
                  const imageUrl = c.imageUrl || "/placeholder-img.jpg"
                  return (
                    <div className={classes.btnSelection} key={cid}>
                      <div className={classes.thumb}>
                        <img src={imageUrl} alt={name} />
                      </div>
                      <div className={classes.imageDescription}>
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

              <div className={classes.input}>
                <select
                  className={classes.dropdownText}
                  style={{ minWidth: "35%" }}
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
                <button
                  className={classes.btnSec}
                  type="button"
                  onClick={handleAdd}
                  disabled={!addPicker}
                >
                  Add
                </button>
              </div>
            </section>

            {updateError && (
              <p style={{ color: "crimson" }}>
                {updateError.message || "Failed to update outfit."}
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
                disabled={isPending}
              >
                {isPending ? "Saving…" : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
