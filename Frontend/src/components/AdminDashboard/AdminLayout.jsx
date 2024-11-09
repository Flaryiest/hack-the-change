import AdminNavbar from "./AdminNavbar.jsx"
import { Outlet } from "react-router-dom"
export default function DashboardLayout() {
    return <div>
        <AdminNavbar></AdminNavbar>
        <Outlet></Outlet>
    </div>
}