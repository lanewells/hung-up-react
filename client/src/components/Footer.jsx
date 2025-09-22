import { NavLink } from "react-router-dom"

export default function Footer() {
  return (
    <div style={{ padding: 24 }}>
      <nav style={{ display: "flex", gap: 12, marginTop: 16 }}>
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
