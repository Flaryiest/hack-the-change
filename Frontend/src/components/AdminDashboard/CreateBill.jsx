import React, { useState } from 'react'
import '../../style/CreateChange.css'

const CreateBill = () => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Form Submitted:", { message })
    setMessage('')
    setTitle('')
    await createBill(title, message)
  }
  async function createBill(title, text) {
    const response = await fetch("https://swag.up.railway.app/"+ "add_bill", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({title: title, text: text}),
    })
    console.log(response)
    const data = await response.json()
    console.log(data)
    return data
}

  return (
    <div className="create-change-form-container">
      <form className="create-change-form" onSubmit={handleSubmit}>

        <h2 className="create-change-form-title">Create Bill</h2>
        <label htmlFor="title" className="create-change-form-label">Title</label>
        <input
          type="text"
          id="title"
          className="create-change-form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          required
        />
        <label htmlFor="message" className="create-change-form-label">Message</label>
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

export default CreateBill
