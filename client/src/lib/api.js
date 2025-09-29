import axios from "axios"

const BASE = import.meta.env.VITE_API_URL

const instance = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" }
})

export const api = {
  listClothes: () => instance.get("/api/clothes").then((res) => res.data),
  getClothing: (id) =>
    instance.get(`/api/clothes/${id}`).then((res) => res.data),
  createClothing: (data) =>
    instance.post("/api/clothes", data).then((res) => res.data),
  updateClothing: (id, data) =>
    instance.put(`/api/clothes/${id}`, data).then((res) => res.data),
  deleteClothing: (id) =>
    instance.delete(`/api/clothes/${id}`).then((res) => res.data),
  listTypes: () => instance.get("/api/types").then((res) => res.data),
  getType: (id) => instance.get(`/api/types/${id}`).then((res) => res.data),
  createType: (data) =>
    instance.post("/api/types", data).then((res) => res.data),
  updateType: (id, data) =>
    instance.put(`/api/types/${id}`, data).then((res) => res.data),
  deleteType: (id) =>
    instance.delete(`/api/types/${id}`).then((res) => res.data),
  listOutfits: () => instance.get("/api/outfits").then((res) => res.data),
  getOutfit: (id) => instance.get(`/api/outfits/${id}`).then((res) => res.data),
  createOutfit: (data) =>
    instance.post("/api/outfits", data).then((res) => res.data),
  updateOutfit: (id, data) =>
    instance.put(`/api/outfits/${id}`, data).then((res) => res.data),
  deleteOutfit: (id) =>
    instance.delete(`/api/outfits/${id}`).then((res) => res.data)
}
