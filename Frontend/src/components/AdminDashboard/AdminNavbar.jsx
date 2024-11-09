import "../../style/Navbar.css"
import { Link } from "react-router-dom"

export default function DashboardNavbar() {
    return <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-header"><Link to="admin">ChangePod Legislator</Link></div>
                <ul className="navbar-left-links">
                    <li className="navbar-link"><Link className="navbar-left-link-text-" to="admin/feedback">Feedback</Link></li>
                    <li className="navbar-link"><Link className="navbar-left-link-text" to="admin/bills">Bills</Link></li>
                </ul>
            </div>
            <div className="navbar-right">
                <ul className="navbar-right-links">
                    <li className="navbar-link"><Link className="navbar-right-link-text" to="admin/create">Create Bill</Link></li>
                </ul>
                <Link to="login" className="navbar-login"><button className="navbar-button">Log Out</button></Link>
            </div>
    </nav>
}