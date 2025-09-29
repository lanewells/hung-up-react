import { Link, useLocation } from "react-router-dom"
import ItemsList from "../components/ItemsList"
import OutfitItem from "../components/OutfitItem"
import { useOutfits } from "../hooks/useOutfit"

export default function OutfitsPage() {
  const { data: outfits = [], isLoading, error } = useOutfits()
  const location = useLocation()

  if (isLoading) return <p>loading…</p>
  if (error) return <p>error: {error.message}</p>

  return (
    <main>
      <div className="container">
        <h2>My Outfits</h2>
        <Link to="/outfits/new">
          <button type="button">Add New</button>
        </Link>
        <ItemsList
          items={outfits}
          renderItem={(outfit) => (
            <Link
              to={`/outfits/${outfit.id || outfit._id}`}
              state={{ from: location }}
            >
              <OutfitItem outfit={outfit} variant="o" />
            </Link>
          )}
        />
      </div>
    </main>
  )
}
