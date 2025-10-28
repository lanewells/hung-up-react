import "dotenv/config"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import { connectDB, disconnectDB } from "./db/index.js"
import clothesRouter from "./routes/clothes.js"
import outfitsRouter from "./routes/outfits.js"
import typesRouter from "./routes/types.js"
import uploadsRouter from "./routes/uploads.js"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const clientDist = path.join(__dirname, "../../client/dist")

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173", credentials: false }))
}
app.use(express.json())
app.use(morgan("dev"))

app.get("/api/health", (_req, res) => res.json({ ok: true }))

app.use("/api/clothes", clothesRouter)
app.use("/api/outfits", outfitsRouter)
app.use("/api/types", typesRouter)
app.use("/api/uploads", uploadsRouter)

app.use(express.static(clientDist))

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next()
  res.sendFile(path.join(clientDist, "index.html"))
})

const PORT = process.env.PORT || 3001

;(async () => {
  try {
    await connectDB()
    app.listen(PORT, () => console.log(`Server running on :${PORT}`))
  } catch (err) {
    console.error("Mongo connect error:", err?.message || err)
    process.exit(1)
  }
})()

process.on("SIGINT", async () => {
  await disconnectDB()
  process.exit(0)
})
process.on("SIGTERM", async () => {
  await disconnectDB()
  process.exit(0)
})
