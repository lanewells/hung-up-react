import { Router } from "express"
import { getAllTypes } from "../controllers/typeController.js"

const r = Router()
r.get("/", getAllTypes)

export default r
