import { NavLink, Link } from "react-router-dom"
import classes from "../styles/Header.module.scss"

export default function Header() {
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
          <NavLink className={classes.navLink} to="/" end>
            My Closet
          </NavLink>
          <NavLink className={classes.navLink} to="/clothes">
            Clothes
          </NavLink>
          <NavLink className={classes.navLink} to="/outfits">
            Outfits
          </NavLink>
          <NavLink className={classes.navLink} to="/drawers">
            Drawers
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
