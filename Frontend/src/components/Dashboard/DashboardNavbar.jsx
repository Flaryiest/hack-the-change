import "../../style/Navbar.css";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react"
export default function DashboardNavbar() {
    const context = useOutletContext();
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
                    <Link to={`dashboard/${userId}`}>ChangePod</Link>
                </div>
                <ul className="navbar-left-links">
                    <li className="navbar-link">
                        <Link className="navbar-left-link-text-" to={`dashboard/${userId}/create`}>
                            Create Feedback
                        </Link>
                    </li>
                    <li className="navbar-link">
                        <Link className="navbar-left-link-text" to={`dashboard/${userId}/changes`}>
                            My Feedback
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-right">
                <ul className="navbar-right-links">
                    <li className="navbar-link">
                        <Link className="navbar-right-link-text" to={`dashboard/${userId}/bills`}>
                            Bills
                        </Link>
                    </li>
                    <li className="navbar-link">
                        <Link className="navbar-right-link-text" to={`dashboard/${userId}/community`}>
                            Community Feedback
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
