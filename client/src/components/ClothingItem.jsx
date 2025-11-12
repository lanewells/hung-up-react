import classes from "../styles/ClothingItem.module.scss"

export default function ClothingItem({ clothing }) {
  return (
    <div className={classes.item}>
      <img src={clothing.imageUrl} alt={clothing.name || null} />
      <div className={classes.details}>
        <p className={classes.nameText}>{clothing.name}</p>
        <div className={classes.specs}>
          <p>
            <span>Colors:</span> {clothing.colors}
          </p>
          <p>
            <span>Subtype:</span> {clothing.subtype}
          </p>
          <p>
            <span>Type:</span> {clothing.typeName}
          </p>
        </div>
      </div>
    </div>
  )
}
