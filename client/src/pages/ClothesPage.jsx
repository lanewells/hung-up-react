import { useClothes } from "../hooks/useClothes"
import ClothesList from "../components/ClothesList"

export default function ClothesPage() {
  const { data: clothes = [], isLoading, error } = useClothes()

  if (isLoading) return <p>loading…</p>
  if (error) return <p>error: {error.message}</p>

  return (
    <main id="clothes-section">
      <div className="container">
        <h2>Clothes Page</h2>
        <ClothesList clothes={clothes} />
      </div>
    </main>
  )
}
