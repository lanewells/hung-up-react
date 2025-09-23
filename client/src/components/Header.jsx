import { NavLink, Link } from "react-router-dom"
import "./Header.css"

export default function Header() {
  return (
    <header>
      <nav>
        <div className="start" style={{ padding: 24 }}>
          <Link to="/" className="logo">
            <img src={null} alt="logo" />
          </Link>
          <h2>Hung-Up</h2>
        </div>
        <div className="navlinks-container">
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
