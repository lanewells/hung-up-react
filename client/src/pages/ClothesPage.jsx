import { useClothes } from "../hooks/useClothes"
import ItemsList from "../components/ItemsList"
import ClothingItem from "../components/ClothingItem"

export default function ClothesPage() {
  const { data: clothes = [], isLoading, error } = useClothes()

  if (isLoading) return <p>loading…</p>
  if (error) return <p>error: {error.message}</p>

  return (
    <main id="clothes-section">
      <div className="container">
        <h2>Clothes Page</h2>
        <ItemsList
          items={clothes}
          renderItem={(clothing) => <ClothingItem clothing={clothing} />}
        />
      </div>
    </main>
  )
}
