import { Link } from "react-router-dom"
import ItemsList from "../components/ItemsList"
import OutfitItem from "../components/OutfitItem"
import { useOutfits } from "../hooks/useOutfit"

export default function OutfitsPage() {
  const { data: outfits = [], isLoading, error } = useOutfits()
  if (isLoading) return <p>loading…</p>
  if (error) return <p>error: {error.message}</p>

  return (
    <main>
      <div className="container">
        <h2>My Outfits</h2>
        <ItemsList
          items={outfits}
          renderItem={(outfit) => (
            <Link to={`/outfits/${outfit.id || outfit._id}`}>
              <OutfitItem outfit={outfit} variant="o" />
            </Link>
          )}
        />
      </div>
    </main>
  )
}
