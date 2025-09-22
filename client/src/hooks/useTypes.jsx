import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/api"
import { normalizeType } from "../utils/normalizeType"

export function useTypes() {
  return useQuery({
    queryKey: ["types"],
    queryFn: api.listTypes,
    select: (data) => data.map(normalizeType)
  })
}
