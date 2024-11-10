import "../../style/Navbar.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
export default function DashboardNavbar() {
    const { userid } = useParams()
    const [userId, setUserId] = useState(userid)
    console.log(userid)
    if (!(userId)) {
        return <div>Loading...</div>;
    }
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-header">
                    <Link to={`admin/${userId}`}>ChangePod Legislator</Link>
                </div>
                <ul className="navbar-left-links">
                    <li className="navbar-link">
                        <Link className="navbar-left-link-text-" to={`admin/${userId}/feedback`}>
                            Feedback
                        </Link>
                    </li>
                    <li className="navbar-link">
                        <Link className="navbar-left-link-text" to={`admin/${userId}/bills`}>
                            Bills
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-right">
                <ul className="navbar-right-links">
                    <li className="navbar-link">
                        <Link className="navbar-right-link-text" to={`admin/${userId}/create`}>
                            Create Bill
                        </Link>
                    </li>
                </ul>
                <Link to="login" className="navbar-login">
                    <button className="navbar-button">Log Out</button>
                </Link>
            </div>
        </nav>
    );
}
