import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/api"

export default function ClothesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clothes"],
    queryFn: api.listClothes
  })
  if (isLoading) return <p>loading…</p>
  if (error) return <p>error: {error.message}</p>
  return (
    <>
      <h2>clothes page</h2>
      <ul>
        {data.map((c) => (
          <li key={c._id}>
            {c.name} {c.type ? <em>({c.type.name})</em> : null}
          </li>
        ))}
      </ul>
    </>
  )
}
