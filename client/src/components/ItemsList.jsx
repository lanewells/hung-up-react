export default function ItemsList({ items, renderItem }) {
  return (
    <div className="items-grid">
      <ul>
        {items.map((item) => (
          <li key={item.id || item._id}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>
  )
}
