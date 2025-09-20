import { useEffect, useState } from "react"
import { api } from "../lib/api"
import ClothingItem from "./ClothingItem"

export default function ClothesList() {
  const [clothes, setClothes] = useState([])

  return (
    <div className="clothes-grid">
      <h2>List:</h2>
      <ul>
        {clothes.map((item) => (
          <li key={item._id}>
            <ClothingItem clothes={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}
