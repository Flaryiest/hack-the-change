import "../style/Login.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
        navigate("/dashboard")
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