import AdminNavbar from "./AdminNavbar.jsx"
import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
export default function DashboardLayout() {
    const [userInfo, setUserInfo] = useState(null)
    const [render, setRender] = useState(0)
    function triggerRender() {
        setRender(prevState => prevState += 1)
    }
    useEffect(() => {
        async function getInfo() {
            const response = await fetch("https://swag.up.railway.app/"+ "user_data", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({}),
            })
            console.log(response)
            const data = await response.json()
            setUserInfo(data)
        }
        getInfo() 
    }, [render])

    return <div>
        <AdminNavbar></AdminNavbar>
        <Outlet context={[userInfo, setUserInfo, render, triggerRender]}></Outlet>
    </div>
}