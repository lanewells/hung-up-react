import { Router } from "express"
import {
  listTypes,
  getType,
  createType,
  updateType,
  deleteType
} from "../controllers/typeController.js"

const r = Router()
r.get("/", listTypes)
r.get("/:id", getType)
r.post("/", createType)
r.put("/:id", updateType)
r.delete("/:id", deleteType)

export default r
