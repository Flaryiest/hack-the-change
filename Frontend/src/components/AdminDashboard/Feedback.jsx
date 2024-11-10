import "../../style/Community.css"
import { useState, useEffect } from "react"
const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState(null)
  useEffect(() => {
    async function getFeedback(title, text) {
      const response = await fetch("https://swag.up.railway.app/"+ "add_bill", {
          method: "GET",
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
  }, [])

  return (
    <div className="community-container">
      <section className="community-section">
        <h2>Feedback</h2>
        <div className="community-cards">
          <div className="community-card">
            <h3>Change Item 1</h3>
            <p>This is a description of Change Item 1. Here you can include more details about this particular change.</p>
          </div>
          <div className="community-card">
            <h3>Change Item 2</h3>
            <p>This is a description of Change Item 2. Here you can include more details about this particular change.</p>
          </div>
          <div className="community-card">
            <h3>Change Item 3</h3>
            <p>This is a description of Change Item 3. Here you can include more details about this particular change.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Feedback
