import AdminNavbar from "./AdminNavbar.jsx"
import { Outlet, useParams } from "react-router-dom"
import {useState, useEffect} from "react"
export default function DashboardLayout() {
    
    const [userInfo, setUserInfo] = useState(null)
    const [render, setRender] = useState(0)
    const  { userid } = useParams()
    console.log(userid, "userid")
    const [userId, setUserId] = useState(userid)
    const [bills, setBills] = useState({
        "Clean Energy Act": {
          "description": "A bill to promote renewable energy sources and reduce carbon emissions by 50% by 2030.",
          "feedback": {
            "User123": "yes",
            "User456": "no"
          }
        },
        "Affordable Healthcare Act": {
          "description": "A bill aimed at making healthcare accessible and affordable for all citizens by expanding insurance subsidies.",
          "feedback": {
            "User789": "yes",
            "User101": "yes"
          }
        }
      }
      )
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
            const data = await response.json()
            setUserInfo(data)
        }
        async function getBills() {
            const response = await fetch("https://swag.up.railway.app/"+ "result/bill", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            console.log(response)
            const data = await response.json()
            if (data) {
                setBills(data)
            }    
        }
        getInfo() 
        getBills()
    }, [render])

    return <div>
        <AdminNavbar></AdminNavbar>
        <Outlet context={[userInfo, setUserInfo, bills, setBills, render, triggerRender, userId]}></Outlet>
    </div>
}