import { Link } from "react-router-dom"
import ItemsList from "../components/ItemsList"
import ClothingItem from "../components/ClothingItem"
import classes from "./ClothesPage.module.scss"
import { useClothes } from "../hooks/useClothes"

export default function ClothesPage() {
  const { data: clothes = [], isLoading, error } = useClothes()

  if (isLoading) return <p>loading…</p>
  if (error) return <p>error: {error.message}</p>

  return (
    <main>
      <div className={classes.container}>
        <h2>Clothes</h2>
        <ItemsList
          items={clothes}
          renderItem={(clothing) => (
            <Link to={`/clothes/${clothing.id || clothing._id}`}>
              <ClothingItem clothing={clothing} variant="c" />
            </Link>
          )}
        />
      </div>
    </main>
  )
}
