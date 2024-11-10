import React, { useState } from "react";
import "../../style/BillResponse.css";
import { useOutletContext } from "react-router-dom";

export default function Bills() {
    const [feedback, setFeedback] = useState({});
    const [showFeedback, setShowFeedback] = useState({});
    const [userInfo, setUserInfo, bills, setBills, render, triggerRender] = useOutletContext()
    return (
        <div className="bill-response-container">
            <div className="bill-response-column">
                <section className="bill-response-section">
                    <h3>Community Feedback</h3>
                    <div className="bill-response-divider" />

                    <div className="bill-response-card-group">
                        {Object.entries(bills).map(([billName, billData]) => (
                            <div key={billName} className="bill-response-large-card">
                                <h4>{billName}</h4>
                                <p>{billData.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
