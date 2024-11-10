import "../style/Login.css"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const endpoint = "n/a"
    const [formData, setFormData] = useState({
        username: '',
    })
    
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        async function login(username) {
            console.log("test 2")
            const response = await fetch("https://swag.up.railway.app/"+ "verify", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: username}),
            })
            console.log(response)
            const data = await response.json()
            console.log(data)
            return data
        }
        
        const status = await login(formData.username)
        if (!(status)) {
            console.log(error)
            setError("Please retry.")
        }
        if (status.success == "true") {
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
                return data
            }
            const user = getInfo()
            if (user.admin == true) {
                navigate("admin")
            }
            else if (user.admin == false) {
                navigate("dashboard")
            }
        }
        else {
            console.log(error)
            setError("Please retry.")
        }
        
    }


        


    return <div className="signup-page">
        <div className="form-container">
            <p className="title">Login</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Identification Number</label>
                    <input type="text" name="username" id="username" placeholder="" onChange={handleChange}/>
                </div>
                <div className="signup-line"></div>
                <div>
                    {(error) && <div className="error-message">{error}</div>}
                </div>
                <button className="sign">Login</button>
            </form>
                <div className="signup-line"></div>
        </div>
    </div>
    
        
}

export default Signup