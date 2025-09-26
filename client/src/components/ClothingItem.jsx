import classes from "./ClothingItem.module.scss"

export default function ClothingItem({ clothing }) {
  return (
    <div className={classes.item}>
      <h3>Clothing item:</h3>
      <img src={clothing.imageUrl} alt={clothing.name || null} />
      <div className={classes.details}>
        <p>Item name: {clothing.name}</p>
        <p>Colors: {clothing.colors}</p>
        <p>Subtype: {clothing.subtype}</p>
        <p>Type: {clothing.typeName}</p>
      </div>
    </div>
  )
}
