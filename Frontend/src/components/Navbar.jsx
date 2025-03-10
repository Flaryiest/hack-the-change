import "../style/Navbar.css"
import { Link } from "react-router-dom"

export default function Navbar() {
    return <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-header"><Link to="">ChangePod</Link></div>
                <ul className="navbar-left-links">
                </ul>
            </div>
            <div className="navbar-right">
                <ul className="navbar-right-links">
                </ul>
                <Link to="login" className="navbar-login"><button className="navbar-button">Login</button></Link>
            </div>
    </nav>
}