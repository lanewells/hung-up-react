export default function TypeItem({ type }) {
  return (
    <div>
      <h3>{type.name}</h3>
      {Array.isArray(type.subtypes) && type.subtypes.length > 0 && (
        <ul>
          {type.subtypes.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      )}
      <p>Drawer: {type.drawer}</p>
    </div>
  )
}
