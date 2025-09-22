import HoverCardSimple from "../components/HoverCardSimple"

export default function HomePage() {
  return (
    <main id="index-section">
      <div className="container">
        <div className="row">
          <HoverCardSimple title="Clothes" linkedPage="/clothes" />
          <HoverCardSimple title="Outfits" linkedPage="/outfits" />
          <HoverCardSimple title="Types" linkedPage="/types" />
        </div>
      </div>
    </main>
  )
}
