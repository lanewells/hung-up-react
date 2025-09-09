import { Router } from "express"
const r = Router()

// temp for server compliance
r.get("/", (_req, res) => res.json([]))

export default r
