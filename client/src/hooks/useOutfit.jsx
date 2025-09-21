import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/api"
import { normalizeOutfit } from "../utils/normalizeOutfit"

export function useOutfits() {
  return useQuery({
    queryKey: ["outfits"],
    queryFn: api.listOutfits,
    select: (data) => data.map(normalizeOutfit),
    staleTime: 60_000
  })
}

export function useOutfit(id) {
  return useQuery({
    queryKey: ["outfit", id],
    queryFn: () => api.getOutfit(id),
    enabled: !!id,
    select: normalizeOutfit,
    staleTime: 60_000
  })
}
