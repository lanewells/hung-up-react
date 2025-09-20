import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/api"

export function useClothes() {
  return useQuery({
    queryKey: ["clothes"],
    queryFn: api.listClothes,
    staleTime: 60_000
  })
}
