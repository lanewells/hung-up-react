export default function OutfitsList({ outfits }) {
  return (
    <div className="outfit-grid">
      <h2>List:</h2>
      <ul>
        {outfits.map((outfit) => (
          <li key={item._id}>
            <ClothingItem outfit={outfit} />
          </li>
        ))}
      </ul>
    </div>
  )
}
