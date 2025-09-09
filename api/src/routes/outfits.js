import { Router } from "express"
import { getAllOutfits } from "../controllers/outfitController.js"

const r = Router()
r.get("/", getAllOutfits)

export default r
