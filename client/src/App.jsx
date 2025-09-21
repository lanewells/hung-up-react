import { NavLink, Outlet, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ClothesPage from "./pages/ClothesPage"
import OutfitsPage from "./pages/OutfitsPage"
import DrawersPage from "./pages/DrawersPage"

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
        <Route path="/" element={<HomePage />} />
        <Route path="/clothes" element={<ClothesPage />} />
        <Route path="/outfits" element={<OutfitsPage />} />
        <Route path="/types" element={<DrawersPage />} />
      </Route>
      {/* 404 */}
      <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
    </Routes>
  )
}
