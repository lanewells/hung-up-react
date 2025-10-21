import { Link, useLocation, useSearchParams } from "react-router-dom"
import { useMemo } from "react"
import ItemsList from "../components/ItemsList"
import ClothingItem from "../components/ClothingItem"
import { useClothes } from "../hooks/useClothes"
import { useTypes } from "../hooks/useTypes"
import classes from "../styles/ClothesPage.module.scss"

export default function ClothesPage() {
  const location = useLocation()
  const [params] = useSearchParams()
  const selectedDrawer = params.get("drawer")

  const {
    data: clothes = [],
    clothesLoading,
    error: clothesError
  } = useClothes()
  const { data: types = [], typesLoading, error: typesError } = useTypes()

  if (clothesLoading || typesLoading) return <p>loading…</p>
  if (clothesError) return <p>error: {clothesError.message}</p>
  if (typesError) return <p>error: {typesError.message}</p>

  const typesById = useMemo(() => {
    const m = new Map()
    for (const t of types) m.set(String(t.id || t._id), t)
    return m
  }, [types])

  const withDrawer = useMemo(() => {
    return clothes.map((c) => {
      const typeId = c.type?._id ? String(c.type._id) : String(c.type)
      const drawer = c.type?.drawer || typesById.get(typeId)?.drawer || null
      return { ...c, drawer }
    })
  }, [clothes, typesById])

  const filtered = selectedDrawer
    ? withDrawer.filter((c) => c.drawer === selectedDrawer)
    : withDrawer

  return (
    <main>
      <div className={classes.container}>
        <h2>
          {selectedDrawer ? <span>My {selectedDrawer}</span> : "All Clothes"}
        </h2>

        {selectedDrawer && (
          <Link
            className={classes.link}
            to="/drawers"
            state={{ from: location }}
          >
            <button className={classes.btnSec} type="button">
              Go back
            </button>
          </Link>
        )}

        <Link className={classes.link} to="/clothes/new">
          <button className={classes.btnSec} type="button">
            + Add item
          </button>
        </Link>

        <ItemsList
          items={filtered}
          variant="c"
          renderItem={(clothing) => (
            <Link
              to={`/clothes/${clothing.id || clothing._id}`}
              state={{ from: location }}
            >
              <ClothingItem clothing={clothing} />
            </Link>
          )}
        />
      </div>
    </main>
  )
}
