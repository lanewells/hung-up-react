import { Router } from "express"
import { getAllClothes } from "../controllers/clothingController.js"

const r = Router()
r.get("/", getAllClothes)

export default r
