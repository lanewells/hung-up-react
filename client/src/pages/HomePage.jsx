import HoverCardSimple from "../components/HoverCardSimple"
import classes from "./HomePage.module.scss"

export default function HomePage() {
  return (
    <main>
      <div className={classes.container}>
        <div className={classes.row}>
          <HoverCardSimple
            className={HoverCardSimple}
            title="Clothes"
            linkedPage="/clothes"
          />
          <HoverCardSimple
            className={HoverCardSimple}
            title="Outfits"
            linkedPage="/outfits"
          />
          <HoverCardSimple
            className={HoverCardSimple}
            title="Types"
            linkedPage="/types"
          />
        </div>
      </div>
    </main>
  )
}
