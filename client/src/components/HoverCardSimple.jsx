import { Link } from "react-router-dom"
import classes from "./HoverCardSimple.module.scss"

export default function HoverCardSimple({ title, linkedPage }) {
  return (
    <div className={classes.columnThird}>
      <div className={classes.hoverCard}>
        <Link to={linkedPage}>
          <div className={classes.innerContent}>
            <h4>{title}</h4>
            <img src="/placeholder-img.jpg" alt={null} />
          </div>
        </Link>
      </div>
    </div>
  )
}
