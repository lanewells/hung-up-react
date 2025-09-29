import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Layout from "./components/Layout"
import ClothesPage from "./pages/ClothesPage"
import OutfitsPage from "./pages/OutfitsPage"
import ClothingDetailPage from "./pages/ClothingDetailPage"
import OutfitDetailPage from "./pages/OutfitDetailPage"
import NewClothingPage from "./pages/NewClothingPage"
import EditClothingPage from "./pages/EditClothingPage"
import NewOutfitPage from "./pages/NewOutfitPage"
import EditOutfitPage from "./pages/EditOutfitPage"
import DrawersPage from "./pages/DrawersPage"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/clothes" element={<ClothesPage />} />
        <Route path="/outfits" element={<OutfitsPage />} />
        <Route path="/drawers" element={<DrawersPage />} />
        <Route path="/clothes/:id" element={<ClothingDetailPage />} />
        <Route path="/outfits/:id" element={<OutfitDetailPage />} />
        <Route path="/clothes/new" element={<NewClothingPage />} />
        <Route path="/outfits/new" element={<NewOutfitPage />} />
        <Route path="/clothes/:id/edit" element={<EditClothingPage />} />
        <Route path="/outfits/:id/edit" element={<EditOutfitPage />} />
      </Route>
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  )
}
