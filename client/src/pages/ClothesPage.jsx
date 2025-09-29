import { Link, useLocation } from "react-router-dom"
import ItemsList from "../components/ItemsList"
import ClothingItem from "../components/ClothingItem"
import classes from "./ClothesPage.module.scss"
import { useClothes } from "../hooks/useClothes"

export default function ClothesPage() {
  const { data: clothes = [], isLoading, error } = useClothes()
  const location = useLocation()

  if (isLoading) return <p>loading…</p>
  if (error) return <p>error: {error.message}</p>

  return (
    <main>
      <div className={classes.container}>
        <h2>My Clothes</h2>
        <Link to="/clothes/new">
          <button type="button">Add New</button>
        </Link>
        <ItemsList
          items={clothes}
          renderItem={(clothing) => (
            <Link
              to={`/clothes/${clothing.id || clothing._id}`}
              state={{ from: location }}
            >
              <ClothingItem clothing={clothing} variant="c" />
            </Link>
          )}
        />
      </div>
    </main>
  )
}
