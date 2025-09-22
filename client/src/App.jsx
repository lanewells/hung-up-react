import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ClothesPage from "./pages/ClothesPage"
import OutfitsPage from "./pages/OutfitsPage"
import TypesPage from "./pages/TypesPage"
import Layout from "./components/Layout"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/clothes" element={<ClothesPage />} />
        <Route path="/outfits" element={<OutfitsPage />} />
        <Route path="/types" element={<TypesPage />} />
      </Route>
      {/* 404 */}
      <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
    </Routes>
  )
}
