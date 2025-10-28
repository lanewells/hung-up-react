import classes from "../styles/DemoBanner.module.scss"

export default function DemoBanner() {
  return (
    <div className={classes.demoBanner}>
      <span>
        <strong>Demo mode</strong> ⚙ changes are shared across visitors.
      </span>
    </div>
  )
}
