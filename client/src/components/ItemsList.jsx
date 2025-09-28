import classes from "./ItemsList.module.scss"

export default function ItemsList({ items, renderItem, variant }) {
  return (
    <div>
      <ul
        className={variant === "c" ? classes.clothesGrid : classes.outfitsGrid}
      >
        {items.map((item) => (
          <li key={item.id || item._id}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>
  )
}
