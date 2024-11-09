import DashboardNavbar from "./DashboardNavbar"
import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
export default function DashboardLayout() {
    const [userInfo, setUserInfo] = useState(null)
    useEffect(() => {
        const getData = async () => {
            const response = await fetch("https://swag.up.railway.app/"+ "submit", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: "temp"}),
            })
            console.log(response)
            const data = await response.json()
            console.log(data)
            setUserInfo(userData)
        }
        getData()
    }, [])
    return <div>
        <DashboardNavbar></DashboardNavbar>
        <Outlet></Outlet>
    </div>
}