import { NavLink, Outlet, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ClothesPage from "./pages/Clothes"
import OutfitsPage from "./pages/Outfits"
import TypesPage from "./pages/Types"

function Layout() {
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
      <Outlet />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/clothes" element={<ClothesPage />} />
        <Route path="/outfits" element={<OutfitsPage />} />
        <Route path="/types" element={<TypesPage />} />
      </Route>
      {/* 404 */}
      <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
    </Routes>
  )
}
