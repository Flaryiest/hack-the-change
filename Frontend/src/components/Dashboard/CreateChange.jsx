import React, { useState } from 'react';
import '../../style/CreateChange.css';
import { useOutletContext } from "react-router-dom"
const CreateChange = () => {
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo, bills, setBills, render, triggerRender, userId] = useOutletContext()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", { message });
    setMessage('');
    await createChange()
  }
  
  async function createChange(userId) {
    const response = await fetch("https://swag.up.railway.app/"+ "feedback/submit", {
      method: "POST",
      credentials: "include",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({id: String(userId), feedback: message}),
  })
  const data = await response.json()
  if (data) {
      console.log(data)
      triggerRender()
  }   
  }

  return (
    <div className="create-change-form-container">
      <form className="create-change-form" onSubmit={handleSubmit}>
        <h2 className="create-change-form-title">Create Change</h2>

        <label htmlFor="message" className="create-change-form-label">Feedback</label>
        <textarea
          id="message"
          className="create-change-form-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
          required
        />

        <button type="submit" className="create-change-form-button">Submit</button>
      </form>
    </div>
  )
}

export default CreateChange
