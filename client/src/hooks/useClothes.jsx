import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/api"
import { normalizeClothing } from "../utils/normalizeClothing"

export function useClothes() {
  return useQuery({
    queryKey: ["clothes"],
    queryFn: api.listClothes,
    select: (data) => data.map(normalizeClothing)
  })
}

export function useClothing(id) {
  return useQuery({
    queryKey: ["clothing", id],
    queryFn: () => api.getClothing(id),
    enabled: !!id,
    select: normalizeClothing
  })
}
