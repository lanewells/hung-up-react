export default function TypeItem({ types }) {
  return (
    <div>
      <h3>{types.name}</h3>
      {Array.isArray(types.subtypes) && types.subtypes.length > 0 && (
        <ul>
          {types.subtypes.map((c) => (
            <li key={c.id || c._id}>{c}</li>
          ))}
          <p>Drawer: {types.drawer}</p>
        </ul>
      )}
    </div>
  )
}
