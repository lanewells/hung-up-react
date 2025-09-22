import ItemsList from "../components/ItemsList"
import TypeItem from "../components/TypeItem"
import { useTypes } from "../hooks/useTypes"

export default function DrawersPage() {
  const { data: types = [], isLoading, error } = useTypes()

  if (isLoading) return <p>loading…</p>
  if (error) return <p>error: {error.message}</p>

  return (
    <div>
      <h2>types/drawers page</h2>
      <ItemsList
        items={types}
        renderItem={(type) => <TypeItem types={type} />}
      />
    </div>
  )
}
