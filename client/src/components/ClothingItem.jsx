export default function ClothingItem({ clothing }) {
  return (
    <div className="clothes-item">
      <h3>Clothing item:</h3>
      <img
        src={clothing.imageUrl}
        alt={clothing.name || ""}
        className="clothes-image"
      />
      <div className="clothes-details">
        <p className="name-text">Item name: {clothing.name}</p>
        <p className="color-text">Colors: {clothing.colors}</p>
        <p className="subtype-text">Subtype: {clothing.subtype}</p>
        <p className="type-text">Type: {clothing.typeName}</p>
      </div>
    </div>
  )
}
