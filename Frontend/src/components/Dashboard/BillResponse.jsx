import React, { useState } from "react";
import "../../style/BillResponse.css";

export default function Bills() {
    const [feedback, setFeedback] = useState({});
    const [showFeedback, setShowFeedback] = useState({});

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
                    body: JSON.stringify({ feedback: feedback[id], cardId: id }),
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

    const cards = [
        { id: 1, title: "Small Card 1 Title", description: "This is a description for Small Card 1. You can add more details here about this bill or its contents." },
        { id: 2, title: "Small Card 2 Title", description: "This is a description for Small Card 2. You can add more details here about this bill or its contents." },
        { id: 3, title: "Small Card 3 Title", description: "This is a description for Small Card 3. You can add more details here about this bill or its contents." },
        { id: 4, title: "Small Card 4 Title", description: "This is a description for Small Card 4. You can add more details here about this bill or its contents." }
    ];

    return (
        <div className="bill-response-container">
            <div className="bill-response-column">
                <section className="bill-response-section">
                    <h3>Bills</h3>
                    <div className="bill-response-divider" />

                    <div className="bill-response-card-group">
                        {cards.map((card) => (
                            <div key={card.id} className="bill-response-large-card">
                                <h4>{card.title}</h4>
                                <p>{card.description}</p>

                                <button
                                    onClick={() =>
                                        setShowFeedback((prevShow) => ({
                                            ...prevShow,
                                            [card.id]: !prevShow[card.id],
                                        }))
                                    }
                                    className="bill-response-feedback-button"
                                >
                                    {showFeedback[card.id] ? <div className="give-feedback">Cancel Feedback</div> : <div className="give-feedback">Give Feedback</div>}
                                </button>

                                {showFeedback[card.id] && (
                                    <form onSubmit={(e) => handleFeedbackSubmit(card.id, e)} className="bill-response-feedback-form">
                                        <label htmlFor={`feedback-${card.id}`}>Do You Support This Bill?</label>
                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`feedback-${card.id}`}
                                                    value="yes"
                                                    checked={feedback[card.id] === "yes"}
                                                    onChange={(e) => handleFeedbackChange(card.id, e)}
                                                />
                                                Yes
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`feedback-${card.id}`}
                                                    value="no"
                                                    checked={feedback[card.id] === "no"}
                                                    onChange={(e) => handleFeedbackChange(card.id, e)}
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
