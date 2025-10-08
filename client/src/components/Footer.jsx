import { NavLink } from "react-router-dom"
import classes from "../styles/Footer.module.scss"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }
  return (
    <footer>
      <div className={classes.start}>
        <div className={classes.logo}>
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className={classes.scroll}>
          <button onClick={scrollToTop}>Scroll to top</button>
        </div>
      </div>
      <div>
        <nav className={classes.navLinksContainer}>
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
        </nav>
      </div>
      <div className={classes.credits}>
        <p>Hung-Up created by Delaney Wells 2024</p>
      </div>
    </footer>
  )
}
