import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Layout from "./components/Layout"
import ClothesPage from "./pages/ClothesPage"
import OutfitsPage from "./pages/OutfitsPage"
import TypesPage from "./pages/TypesPage"
import ClothingDetailPage from "./pages/ClothingDetailPage"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/clothes" element={<ClothesPage />} />
        <Route path="/outfits" element={<OutfitsPage />} />
        <Route path="/types" element={<TypesPage />} />
        <Route path="/clothes/:id" element={<ClothingDetailPage />} />
      </Route>
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  )
}
