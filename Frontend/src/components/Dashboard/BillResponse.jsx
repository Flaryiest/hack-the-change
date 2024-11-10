import React, { useState } from "react";
import "../../style/BillResponse.css";
import { useOutletContext } from "react-router-dom";

export default function Bills() {
    const [feedback, setFeedback] = useState({});
    const [showFeedback, setShowFeedback] = useState({});
    const [userInfo, setUserInfo, bills, setBills, render, triggerRender] = useOutletContext();

    const handleFeedbackChange = (id, e) => {
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [id]: e.target.value,
        }));
    };

    const handleFeedbackSubmit = async (id, e) => {
        e.preventDefault();

        if (feedback[id]?.trim()) {
            try {
                const response = await fetch("https://your-api-endpoint.com/feedback", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ feedback: feedback[id], billName: id }),
                });

                if (response.ok) {
                    alert("Feedback submitted successfully");
                    setFeedback((prevFeedback) => ({
                        ...prevFeedback,
                        [id]: "",
                    }));
                    setShowFeedback((prevShow) => ({
                        ...prevShow,
                        [id]: false,
                    }));
                } else {
                    alert("Failed to submit feedback");
                }
            } catch (error) {
                console.error("Error submitting feedback:", error);
                alert("An error occurred. Please try again later.");
            }
        } else {
            alert("Please select an option.");
        }
    };

    return (
        <div className="bill-response-container">
            <div className="bill-response-column">
                <section className="bill-response-section">
                    <h3>Bills</h3>
                    <div className="bill-response-divider" />

                    <div className="bill-response-card-group">
                        {Object.entries(bills).map(([billName, billData]) => (
                            <div key={billName} className="bill-response-large-card">
                                <h4>{billName}</h4>
                                <p>{billData.description}</p>

                                <button
                                    onClick={() =>
                                        setShowFeedback((prevShow) => ({
                                            ...prevShow,
                                            [billName]: !prevShow[billName],
                                        }))
                                    }
                                    className="bill-response-feedback-button"
                                >
                                    {showFeedback[billName] ? (
                                        <div className="give-feedback">Cancel Feedback</div>
                                    ) : (
                                        <div className="give-feedback">Give Feedback</div>
                                    )}
                                </button>

                                {showFeedback[billName] && (
                                    <form onSubmit={(e) => handleFeedbackSubmit(billName, e)} className="bill-response-feedback-form">
                                        <label htmlFor={`feedback-${billName}`}>Do You Support This Bill?</label>
                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`feedback-${billName}`}
                                                    value="yes"
                                                    checked={feedback[billName] === "yes"}
                                                    onChange={(e) => handleFeedbackChange(billName, e)}
                                                />
                                                Yes
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`feedback-${billName}`}
                                                    value="no"
                                                    checked={feedback[billName] === "no"}
                                                    onChange={(e) => handleFeedbackChange(billName, e)}
                                                />
                                                No
                                            </label>
                                        </div>
                                        <button type="submit" className="bill-response-feedback-submit">Submit Feedback</button>
                                    </form>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
