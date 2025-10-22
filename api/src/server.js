import "dotenv/config"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import mongoose from "mongoose"
import { connectDB, disconnectDB } from "./db/index.js"
import clothesRouter from "./routes/clothes.js"
import outfitsRouter from "./routes/outfits.js"
import typesRouter from "./routes/types.js"
import uploadsRouter from "./routes/uploads.js"

const app = express()

app.use(cors({ origin: "http://localhost:5173", credentials: false }))
app.use(express.json())
app.use(morgan("dev"))

app.get("/api/health", (req, res) => res.json({ ok: true }))

// routes
app.use("/api/clothes", clothesRouter)
app.use("/api/outfits", outfitsRouter)
app.use("/api/types", typesRouter)
app.use("/api/uploads", uploadsRouter)

const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI

;(async () => {
  try {
    await connectDB()
    app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`))
  } catch (err) {
    console.error("Mongo connect error:", err.message)
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
