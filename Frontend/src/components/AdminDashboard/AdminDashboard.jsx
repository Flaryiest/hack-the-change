import "../../style/AdminDashboard.css";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [userInfo, setUserInfo, bills, setBills, render, triggerRender, userId, feedback, setFeedback] = useOutletContext();

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-column">
        <h2>Public</h2>
        <section className="admin-dashboard-section">
          <h3>Consensus</h3>
          <div className="admin-dashboard-divider" />

          {feedback ? (
            <div className="admin-dashboard-cards">
              {Object.entries(feedback).map(([feedbackText, feedbackResponses]) => (
                <div key={feedbackText} className="admin-dashboard-large-card">
                  <h4>{feedbackText}</h4>
                </div>
              ))}
            </div>
          ) : (
            <div className="admin-dashboard-cards">
              <div className="admin-dashboard-large-card">Loading... will take a while because we are broke</div>
            </div>
          )}
        </section>
      </div>

      <div className="admin-dashboard-column">
        <h2>Bills</h2>
        <section className="admin-dashboard-section">
          <h3>Proposed Bills</h3>
          <div className="admin-dashboard-divider" />
          {Object.keys(bills).map((billName, index) => (
            <div key={index} className="admin-dashboard-card-group">
              {/* Small cards for bill details */}
              <div className="admin-dashboard-bill-cards">
                <div className="admin-dashboard-small-card">
                  <h4>{billName}</h4>
                </div>

                <div className="admin-dashboard-small-card">
                  <h5>Feedback:</h5>
                  {bills[billName].feedback && Object.entries(bills[billName].feedback).map(([userId, feedbackText], feedbackIndex) => (
                    <div key={feedbackIndex}>
                      <p><strong>{userId}:</strong> {feedbackText}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-dashboard-large-card">
                <h4>{billName} Description</h4>
                <p>{bills[billName].description}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
