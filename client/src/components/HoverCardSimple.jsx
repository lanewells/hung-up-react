import { Link } from "react-router-dom"

export default function HoverCardSimple({ title, linkedPage }) {
  return (
    <div className="column-third">
      <div className="hover-card">
        <Link to={linkedPage}>
          <div className="inner-content hover">
            <h4>{title}</h4>
            <img src="/placeholder-img.jpg" alt="" />
          </div>
        </Link>
      </div>
    </div>
  )
}
