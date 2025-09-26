import classes from "./ItemsList.module.scss"

export default function ItemsList({ items, renderItem }) {
  return (
    <div>
      <ul className={classes.itemsGrid}>
        {items.map((item) => (
          <li key={item.id || item._id}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>
  )
}
