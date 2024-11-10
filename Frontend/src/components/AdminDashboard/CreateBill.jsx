import React, { useState } from 'react';
import '../../style/CreateChange.css';

const CreateBill = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", { message });
    setMessage('');
  }

  return (
    <div className="create-change-form-container">
      <form className="create-change-form" onSubmit={handleSubmit}>
        <h2 className="create-change-form-title">Create Bill</h2>

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
