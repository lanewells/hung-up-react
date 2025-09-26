import { NavLink, Link } from "react-router-dom"
import classes from "./Header.module.scss"

export default function Header() {
  return (
    <header>
      <nav>
        <div className={classes.start}>
          <Link to="/" className={classes.logo}>
            <img src={null} alt="logo" />
          </Link>
          <h2>Hung-Up</h2>
        </div>
        <div className={classes["navlinks-container"]}>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/clothes">Clothes</NavLink>
          <NavLink to="/outfits">Outfits</NavLink>
          <NavLink to="/types">Types</NavLink>
        </div>
      </nav>
    </header>
  )
}
