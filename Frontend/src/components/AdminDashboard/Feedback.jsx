import "../../style/Community.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Feedback = () => {
  const [userInfo, setUserInfo, bills, setBills, render, triggerRender, userId, feedback, setFeedback] = useOutletContext();

  return (
    <div className="community-container">
      <section className="community-section">
        <h2>Feedback</h2>
        <div className="community-cards">
          {/* Check if feedback is available */}
          {feedback ? (
            Object.entries(feedback).map(([feedbackText, feedbackResponses], index) => (
              <div key={index} className="community-card">
                <div className="feedback-section-header">{feedbackText}</div>
                {/* Map through the responses for this feedback item */}
                <div className="feedback-responses">
                  {feedbackResponses.map((response, responseIndex) => (
                    <p id="I-hate-everything" key={responseIndex}>{response}</p>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="community-card">
              <p>Loading feedback...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Feedback;
