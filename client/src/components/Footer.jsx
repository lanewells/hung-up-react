import { NavLink } from "react-router-dom"
import classes from "./Footer.module.scss"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }
  return (
    <footer>
      <div className={classes.footer}>
        <div className={classes.footer}>
          <img src={null} alt="logo" />
        </div>
        <div className="jump">
          <button onClick={scrollToTop}>
            <div>
              <i className="fas fa-angle-up icon"></i>
            </div>
            Scroll to top
          </button>
        </div>
      </div>
      <div>
        <nav className="navlinks-container">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/clothes">Clothes</NavLink>
          <NavLink to="/outfits">Outfits</NavLink>
          <NavLink to="/types">Types</NavLink>
        </nav>
      </div>
      <div className="credits">
        <p>Hung-Up created by Delaney Wells 2024</p>
      </div>
    </footer>
  )
}
