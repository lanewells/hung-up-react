import { Router } from "express"
import {
  listClothes,
  getClothing,
  createClothing,
  updateClothing,
  deleteClothing
} from "../controllers/clothingController.js"

const r = Router()

r.get("/", listClothes)
r.get("/:id", getClothing)
r.post("/", createClothing)
r.put("/:id", updateClothing)
r.delete("/:id", deleteClothing)

export default r
