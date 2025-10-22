import { useState, useRef } from "react"
import axios from "axios"
import classes from "../styles/ImagePicker.module.scss"

export default function ImagePicker({ onUploaded }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)

  function handleSelect(e) {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setIsUploaded(false)
  }

  async function handleUpload() {
    if (!file || isUploading) return
    setIsUploading(true)
    setIsUploaded(false)

    const form = new FormData()
    form.append("image", file)

    try {
      const res = await axios.post("/api/uploads/image", form, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      const { url } = res.data
      onUploaded?.(url)
      setIsUploaded(true)
    } catch (err) {
      console.error(err)
      alert("Upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  const fileInputRef = useRef(null)

  function handleRemove(e) {
    e.preventDefault()
    e.stopPropagation()

    setFile(null)
    setPreview("")
    setIsUploaded(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
      fileInputRef.current.blur()
    }

    onUploaded?.("") // reset on parent's form also
  }

  return (
    <div className={classes.picker}>
      {preview && (
        <img
          src={preview}
          alt="preview"
          className={`${classes.preview} ${isUploaded ? classes.uploaded : ""}`}
        />
      )}

      <div className={classes.buttonContainer}>
        <label className={classes.btnSec}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleSelect}
            className={classes.fileInput}
          />
          Choose image
        </label>

        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={classes.btnPri}
        >
          {isUploading ? "Uploading..." : isUploaded ? "Uploaded ✓" : "Upload"}
        </button>

        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className={classes.btnRemove}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}
