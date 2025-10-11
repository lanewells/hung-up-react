import { Link, useLocation } from "react-router-dom"
import { useMemo } from "react"
import { useTypes } from "../hooks/useTypes"
import { useClothes } from "../hooks/useClothes"
import classes from "../styles/DrawersPage.module.scss"

export default function DrawersPage() {
  const location = useLocation()

  const {
    data: types = [],
    isLoading: typesLoading,
    error: typesError
  } = useTypes()

  const {
    data: clothes = [],
    isLoading: clothesLoading,
    error: clothesError
  } = useClothes()

  const drawers = useMemo(() => {
    return Array.from(
      new Set((types || []).map((t) => t.drawer).filter(Boolean))
    )
      .sort()
      .slice(0, 6)
  }, [types])

  const typesById = useMemo(() => {
    const m = new Map()
    for (const t of types || []) m.set(String(t.id || t._id), t)
    return m
  }, [types])

  const clothesWithDrawer = useMemo(() => {
    return (clothes || []).map((c) => {
      const typeId = c?.type?._id ? String(c.type._id) : String(c?.type ?? "")
      const drawer = c?.type?.drawer || typesById.get(typeId)?.drawer || null
      return { ...c, drawer }
    })
  }, [clothes, typesById])

  const previewsByDrawer = useMemo(() => {
    const map = new Map()
    for (const d of drawers) map.set(d, [])
    for (const c of clothesWithDrawer) {
      if (!c.drawer || !map.has(c.drawer)) continue
      const arr = map.get(c.drawer)
      if (arr.length < 5) arr.push(c)
    }
    return map
  }, [drawers, clothesWithDrawer])

  if (typesLoading || clothesLoading) return <p>loading…</p>
  if (typesError) return <p>error: {typesError.message}</p>
  if (clothesError) return <p>error: {clothesError.message}</p>

  return (
    <main className={classes.container}>
      <h2>My Drawers</h2>
      <div className={classes.drawersContainer}>
        {drawers.map((name) => {
          const preview = previewsByDrawer.get(name) || []
          return (
            <Link
              key={name}
              to={`/clothes?drawer=${encodeURIComponent(name)}`}
              state={{ from: location }}
              className={classes.drawer}
            >
              <span className={classes.drawerTitle}>{name}</span>
              <div className={classes.drawerPreview}>
                {preview.length === 0 ? (
                  <span className={classes.empty}>No items yet</span>
                ) : (
                  preview.map((item) => (
                    <img
                      key={item.id || item._id}
                      src={item.imageUrl || "/placeholder.jpg"}
                      alt={item.name}
                      loading="lazy"
                    />
                  ))
                )}
              </div>
            </Link>
          )
        })}
        {drawers.length === 0 && <p>No drawers found.</p>}
      </div>
    </main>
  )
}
