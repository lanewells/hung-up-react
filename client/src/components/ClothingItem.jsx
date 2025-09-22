export default function ClothingItem({ clothes }) {
  return (
    <div className="clothes-item">
      <h3>Item:</h3>
      <img
        src={clothes.imageUrl}
        alt={clothes.name || ""}
        className="clothes-image"
      />
      <div className="clothes-details">
        <p className="name-text">Item name: {clothes.name}</p>
        <p className="color-text">Colors: {clothes.colors}</p>
        <p className="subtype-text">Subtype: {clothes.subtype}</p>
        <p className="type-text">Type: {clothes.typeName}</p>
      </div>
    </div>
  )
}
