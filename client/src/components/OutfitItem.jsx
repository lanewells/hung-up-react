import classes from "../styles/OutfitItem.module.scss"

export default function OutfitItem({ outfit }) {
  return (
    <div className={classes.outfitItem}>
      <img src={outfit.imageUrl} alt={outfit.title || null} />
      <div className={classes.outfitDetails}>
        <div className={classes.row}>
          <h3>{outfit.title}</h3>
          <h2>^</h2>
        </div>
        <p>Occasions: {outfit.occasion}</p>
        <div className={classes.clothingList}>
          {/* "items" in map below refers to the "items" property of Outfit (clothing items) */}
          {outfit.items.map((c) => (
            <div key={c.id} className={classes.outfitClothingImages}>
              {c.imageUrl && <img src={c.imageUrl} alt={c.name || null} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
