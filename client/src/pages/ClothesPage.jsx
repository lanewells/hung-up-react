import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/api"
import ClothesList from "../components/ClothesList"

export default function ClothesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clothes"],
    queryFn: api.listClothes
  })
  if (isLoading) return <p>loading…</p>
  if (error) return <p>error: {error.message}</p>
  return (
    <main id="clothes-section">
      <div className="container">
        <h2>Clothes Page</h2>
        <ClothesList />
      </div>
    </main>
  )
}
