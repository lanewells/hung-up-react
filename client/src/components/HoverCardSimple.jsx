import { Link } from "react-router-dom"
import classes from "../styles/HoverCardSimple.module.scss"

export default function HoverCardSimple({ title, linkedPage, imgSrc }) {
  return (
    <div className={classes.hoverCard}>
      <Link to={linkedPage}>
        <div className={classes.innerContent}>
          <h4>{title}</h4>
          <img src={imgSrc} alt={`${title} thumbnail`} />
        </div>
      </Link>
    </div>
  )
}
