import DashboardNavbar from "./DashboardNavbar"
import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
export default function DashboardLayout() {
    const [userInfo, setUserInfo] = useState({latest_feedback : "", feedback_history: ['Education is for the weak', 'What daylight is there to save when there is only darkness for our future', 'Books are a vector for misinformation, so they must be censored when needed', 'Animal Dissection is useful for people to know what they are up against in the medical field'], admin: false})
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
        <DashboardNavbar></DashboardNavbar>
        <Outlet context={[userInfo, setUserInfo, render, triggerRender]}></Outlet>
    </div>
}