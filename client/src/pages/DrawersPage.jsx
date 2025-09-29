import { Link, useLocation } from "react-router-dom"
import { useTypes } from "../hooks/useTypes"
import classes from "./DrawersPage.module.scss"

export default function DrawersPage() {
  const { data: types = [], isLoading, error } = useTypes()
  const location = useLocation()

  if (isLoading) return <p>loading…</p>
  if (error) return <p>error: {error.message}</p>

  const drawers = Array.from(
    new Set(types.map((t) => t.drawer).filter(Boolean))
  )
    .sort()
    .slice(0, 6)

  return (
    <main className="container">
      <h2>Drawers</h2>
      <div className={classes.drawersContainer}>
        {drawers.map((name) => (
          <Link
            key={name}
            to={`/clothes?drawer=${encodeURIComponent(name)}`}
            state={{ from: location }}
            className={classes.drawer}
          >
            {name}
          </Link>
        ))}
        {drawers.length === 0 && <p>No drawers found.</p>}
      </div>
    </main>
  )
}
