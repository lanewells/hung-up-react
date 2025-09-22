import { NavLink } from "react-router-dom"

export default function Header() {
  return (
    <div style={{ padding: 24 }}>
      <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/clothes">Clothes</NavLink>
        <NavLink to="/outfits">Outfits</NavLink>
        <NavLink to="/types">Types</NavLink>
      </nav>
    </div>
  )
}
