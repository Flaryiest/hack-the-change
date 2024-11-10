import "../../style/Dashboard.css"
import { useOutletContext, useParams } from "react-router-dom"

const Dashboard = () => {
  const [userInfo, setUserInfo, bills, setBills, render, triggerRender, userId] = useOutletContext()
  const feedbackHistory = userInfo.feedback_history || []
  return (
    <div className="dashboard-container">
      <section className="dashboard-section">
        <h2>Proposed Bills</h2>
        <div className="dashboard-cards">
          {Object.entries(bills).slice(0, 2).map(([billName, billData], index) => (
            <div key={index} className="dashboard-card">
              <h3 className="bill-title">{billName}</h3>
              <p>{billData.description}</p>
              <div className="feedback-section">
              </div>
            </div>
          ))}
          {Object.keys(bills).length === 0 && (
            <div className="dashboard-card">No bills available.</div>
          )}
        </div>
      </section>
      
      <div className="dashboard-divider" />

      <section className="dashboard-section">
        <h2>My Feedback</h2>
        <div className="dashboard-cards">
          {feedbackHistory.length > 0 ? (
            feedbackHistory.slice(0, 3).map((feedback, index) => (
              <div key={index} className="dashboard-card">
                {feedback}
              </div>
            ))
          ) : (
            <div className="dashboard-card">Create some feedback to see it here!</div>
          )}
        </div>
      </section>

    </div>
  )
}

export default Dashboard

