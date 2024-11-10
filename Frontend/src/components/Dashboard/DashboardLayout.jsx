import DashboardNavbar from "./DashboardNavbar"
import { Outlet, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
export default function DashboardLayout() {
    const { userid } = useParams()
    const [userId, setUserId] = useState(userid)
    const [userInfo, setUserInfo] = useState({latest_feedback : "Education is for the weak", feedback_history: ['Education is for the weak', 'What daylight is there to save when there is only darkness for our future', 'Books are a vector for misinformation, so they must be censored when needed', 'Animal Dissection is useful for people to know what they are up against in the medical field'], admin: false})
    const [feedback, setFeedback] = useState(null)
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
                body: JSON.stringify({id: String(userId)}),
            })
            const data = await response.json()
            if (data) {
                console.log(data)
                setUserInfo(data.data)
            }    
        }

        async function getBills() {
            const response = await fetch("https://swag.up.railway.app/"+ "result/bills", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: String(userId)}),
            })
            const data = await response.json()
            if (data) {
                console.log(data, "bills")
                setBills(data)
            }   
        }
        

        getInfo()
        getBills()
    }, [render])
    useEffect(() => {
        async function getFeedback() {
          const response = await fetch("https://swag.up.railway.app/" + "result/feedback", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: String(userId) }),
          });
          const data = await response.json();
          if (data) {
            setFeedback(data);
          }
        }
        getFeedback()
      }, [render])

    return <div>
        <DashboardNavbar></DashboardNavbar>
        <Outlet context={[userInfo, setUserInfo, bills, setBills, render, triggerRender, userId]}></Outlet>
    </div>
}