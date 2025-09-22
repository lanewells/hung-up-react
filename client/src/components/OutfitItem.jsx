export default function OutfitItem({ outfit }) {
  return (
    <div className="outfit-item">
      <img
        src={outfit.imageUrl}
        alt={outfit.title || ""}
        className="outfit-image"
      />
      <h3>{outfit.title}</h3>
      <div className="outfit-details">
        <div className="outfit-row row"></div>
        <p className="outfit-text"></p>
        <p>
          <i className="fas fa-angle-up icon"></i>
        </p>
      </div>

      <p className="occasion-text"></p>

      {/* "items" in map below refers to the "items" property of Outfit (clothing items) */}

      {outfit.items.map((c) => (
        <div key={c.id} className="outfit-clothing-images">
          <div className="clothing-image-wrapper">
            {c.imageUrl && (
              <img
                src={c.imageUrl}
                alt={c.name || ""}
                className="clothing-image"
              />
            )}
          </div>
          <p>{c.name || c.id}</p>
        </div>
      ))}
    </div>
  )
}
