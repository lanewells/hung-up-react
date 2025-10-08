import HoverCardSimple from "../components/HoverCardSimple"
import classes from "../styles/HomePage.module.scss"

export default function HomePage() {
  return (
    <main>
      <div className={classes.container}>
        <div className={classes.row}>
          <HoverCardSimple
            title="Clothes"
            linkedPage="/clothes"
            imgSrc="/clothes-thumbnail.jpg"
          />
          <HoverCardSimple
            title="Outfits"
            linkedPage="/outfits"
            imgSrc="/outfits-thumbnail.jpg"
          />
          <HoverCardSimple
            title="Drawers"
            linkedPage="/drawers"
            imgSrc="/drawers-thumbnail.jpg"
          />
        </div>
      </div>
    </main>
  )
}
