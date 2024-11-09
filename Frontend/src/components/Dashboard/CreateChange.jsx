import React, { useState } from 'react';
import '../../style/CreateChange.css';

const CreateChange = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", { title, message });
    setTitle('');
    setMessage('');
  }

  return (
    <div className="create-change-form-container">
      <form className="create-change-form" onSubmit={handleSubmit}>
        <h2 className="create-change-form-title">Create Change</h2>

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

export default CreateChange
