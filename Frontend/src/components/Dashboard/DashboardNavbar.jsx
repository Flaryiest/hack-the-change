import "../../style/Navbar.css"
import { Link } from "react-router-dom"

export default function DashboardNavbar() {
    return <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-header"><Link to="dashboard">ChangePod</Link></div>
                <ul className="navbar-left-links">
                    <li className="navbar-link"><Link className="navbar-left-link-text-" to="dashboard/create">Create Feedback</Link></li>
                    <li className="navbar-link"><Link className="navbar-left-link-text" to="dashboard/changes">My Feedback</Link></li>
                </ul>
            </div>
            <div className="navbar-right">
                <ul className="navbar-right-links">
                <li className="navbar-link"><Link className="navbar-right-link-text" to="dashboard/bills">Bills</Link></li>
                    <li className="navbar-link"><Link className="navbar-right-link-text" to="dashboard/community">Community Feedback</Link></li>
                </ul>
                <Link to="login" className="navbar-login"><button className="navbar-button">Log Out</button></Link>
            </div>
    </nav>
}