import DashboardNavbar from "./DashboardNavbar"
import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
export default function DashboardLayout() {
    const [userInfo, setUserInfo] = useState(null)

    return <div>
        <DashboardNavbar></DashboardNavbar>
        <Outlet></Outlet>
    </div>
}