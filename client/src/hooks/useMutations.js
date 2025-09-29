import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../lib/api"

export function useCreateClothing() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload) => api.createClothing(payload),
    onSuccess: (created) => {
      qc.invalidateQueries({ queryKey: ["clothes"] })
      qc.setQueryData(["clothing", created._id || created.id], created)
    }
  })
}
