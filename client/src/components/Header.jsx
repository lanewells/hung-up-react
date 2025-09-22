import { NavLink, Link } from "react-router-dom"
import "./Header.css"
import "./Master.css"

export default function Header() {
  return (
    <header>
      <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <div className="start" style={{ padding: 24 }}>
          <Link to="/" className="logo">
            <img src={null} alt="logo" />
          </Link>
          <h2>Hung-Up</h2>
        </div>
        <div>
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
