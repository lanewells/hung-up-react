import { NavLink, Link } from "react-router-dom"
import classes from "../styles/Header.module.scss"

export default function Header() {
  const getClass = ({ isActive }) =>
    isActive ? `${classes.navLink} ${classes.active}` : classes.navLink

  return (
    <header>
      <nav>
        <div className={classes.start}>
          <Link to="/" className={classes.logo}>
            <img src="/logo.svg" alt="logo" />
          </Link>
          <h2>Hung-Up</h2>
        </div>
        <div className={classes.navLinksContainer}>
          <NavLink className={getClass} to="/" end>
            My Closet
          </NavLink>
          <NavLink className={getClass} to="/clothes">
            Clothes
          </NavLink>
          <NavLink className={getClass} to="/outfits">
            Outfits
          </NavLink>
          <NavLink className={getClass} to="/drawers">
            Drawers
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
