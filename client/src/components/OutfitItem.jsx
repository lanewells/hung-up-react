import classes from "./OutfitItem.module.scss"

export default function OutfitItem({ outfit }) {
  return (
    <div className={classes.outfitItem}>
      <img src={outfit.imageUrl} alt={outfit.title || null} />
      <h3>{outfit.title}</h3>
      <div className={classes.outfitDetails}>
        <div className={classes.outfitRow}></div>
        <p className={classes.outfitText}></p>
        <p>
          <i className="fas fa-angle-up icon"></i>
        </p>
        <div className={classes.clothingList}>
          {/* "items" in map below refers to the "items" property of Outfit (clothing items) */}
          {outfit.items.map((c) => (
            <div key={c.id} className={classes.outfitClothingImages}>
              <div className={classes.clothingImagesWrapper}>
                {c.imageUrl && <img src={c.imageUrl} alt={c.name || null} />}
              </div>
              <p>{c.name || c.id}</p>
            </div>
          ))}
        </div>
      </div>

      <p className={classes.occasionText}></p>
    </div>
  )
}
