import { Link, useLocation } from "react-router-dom"
import ItemsList from "../components/ItemsList"
import OutfitItem from "../components/OutfitItem"
import { useOutfits } from "../hooks/useOutfit"
import PageMessage from "../components/PageMessage"
import classes from "../styles/OutfitsPage.module.scss"

export default function OutfitsPage() {
  const { data: outfits = [], isLoading, error } = useOutfits()
  const location = useLocation()

  if (isLoading) return <PageMessage text="Loading..." />
  if (error) return <PageMessage text={`error: ${error.message}`} />

  return (
    <main>
      <div className={classes.container}>
        <h2 className={classes.pageTitle}>My Outfits</h2>
        <Link className={classes.link} to="/outfits/new">
          <button className={classes.btnSec} type="button">
            + Add item
          </button>
        </Link>
        <ItemsList
          items={outfits}
          variant="o"
          renderItem={(outfit) => (
            <Link
              className={classes.link}
              to={`/outfits/${outfit.id || outfit._id}`}
              state={{ from: location }}
            >
              <OutfitItem outfit={outfit} />
            </Link>
          )}
        />
      </div>
    </main>
  )
}
