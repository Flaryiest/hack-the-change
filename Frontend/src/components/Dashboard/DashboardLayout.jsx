import DashboardNavbar from "./DashboardNavbar"
import { Outlet } from "react-router-dom"
export default function DashboardLayout() {
    return <div>
        <DashboardNavbar></DashboardNavbar>
        <Outlet></Outlet>
    </div>
}