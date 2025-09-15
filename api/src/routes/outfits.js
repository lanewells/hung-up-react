import { Router } from "express"
import {
  listOutfits,
  getOutfit,
  createOutfit,
  updateOutfit,
  deleteOutfit
} from "../controllers/outfitController.js"

const r = Router()

r.get("/", listOutfits)
r.get("/:id", getOutfit)
r.post("/", createOutfit)
r.put("/:id", updateOutfit)
r.delete("/:id", deleteOutfit)

export default r
