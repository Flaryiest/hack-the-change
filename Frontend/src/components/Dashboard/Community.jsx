import React, { useState, useEffect } from "react";
import "../../style/BillResponse.css";
import { useOutletContext } from "react-router-dom";

export default function Bills() {
  const [feedback, setFeedback] = useState({});
  const [userInfo, setUserInfo, bills, setBills, render, triggerRender, userId] = useOutletContext();

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
  }, [])

  return (
    <div className="bill-response-container">
      <div className="bill-response-column">
        <section className="bill-response-section">
          <h3>Community Feedback</h3>
          <div className="bill-response-divider" />

          <div className="bill-response-card-group">
            {Object.entries(feedback).map(([billName, billData]) => (
              <div key={billName} className="bill-response-large-card">
                <h4>{billName}</h4>

                {Object.entries(feedback).map(([feedbackText, feedbackResponses]) => {
                  if (feedbackText === billName) {
                    return (
                      <div key={feedbackText} className="feedback-item">
                        <h5>Feedback:</h5>
                        {feedbackResponses.map((response, index) => (
                          <p key={index} className="feedback-response">{response}</p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
