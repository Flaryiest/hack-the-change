import { Outlet } from "react-router-dom"
import Navbar from "./Navbar.jsx"
export default function Layout() {
    return <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
    </div>
}