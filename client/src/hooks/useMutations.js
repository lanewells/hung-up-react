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

export function useUpdateClothing() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => api.updateClothing(id, data),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: ["clothes"] })
      qc.setQueryData(["clothing", updated.id || updated._id], updated)
    }
  })
}

export function useDeleteClothing() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => api.deleteClothing(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: ["clothes"] })
      qc.removeQueries({ queryKey: ["clothing", id] })
    }
  })
}
