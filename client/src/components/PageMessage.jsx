import classes from "../styles/PageMessage.module.scss"

export default function PageMessage({ text }) {
  return <div className={classes.pageMessage}>{text}</div>
}
