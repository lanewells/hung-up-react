import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../lib/api"

export function useCreateOutfit() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload) => api.createOutfit(payload),
    onSuccess: (created) => {
      qc.invalidateQueries({ queryKey: ["outfits"] })
      qc.setQueryData(["outfit", created._id || created.id], created)
    }
  })
}

export function useUpdateOutfit() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => api.updateOutfit(id, data),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: ["outfits"] })
      qc.setQueryData(["outfit", updated.id || updated._id], updated)
    }
  })
}
