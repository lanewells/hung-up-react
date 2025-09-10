import React from "react"
import ReactDOM from "react-dom/client"
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query"
import api from "./lib/api"

const qc = new QueryClient()

function Section({ title, path }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [path],
    queryFn: async () => (await api.get(path)).data,
    retry: false
  })

  if (isLoading)
    return (
      <section>
        <h2>{title}</h2>
        <p>loading…</p>
      </section>
    )
  if (isError)
    return (
      <section>
        <h2>{title}</h2>
        <p>error: {error?.message}</p>
      </section>
    )

  return (
    <section style={{ marginBottom: 24 }}>
      <h2 style={{ marginBottom: 8 }}>{title}</h2>
      {Array.isArray(data) ? (
        <ul>{data.map(renderItem)}</ul>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </section>
  )
}

function App() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ marginBottom: 16 }}>hung-up — data check</h1>
      <Section title="Clothes" path="/api/clothes" />
      <Section title="Outfits" path="/api/outfits" />
      <Section title="Types" path="/api/types" />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
