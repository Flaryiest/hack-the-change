import "../../style/MyChanges.css";
import { useOutletContext } from "react-router-dom";

const MyChanges = () => {
    const [userInfo, setUserInfo, bills, setBills, render, triggerRender, userId] = useOutletContext();
    const feedbackHistory = userInfo.feedback_history || [];

    return (
        <div className="bill-response-container">
            <div className="bill-response-column">
                <section className="bill-response-section">
                    <h3>My Feedback</h3>
                    <div className="bill-response-divider" />

                    <div className="bill-response-card-group">
                        {feedbackHistory.length > 0 ? (
                            feedbackHistory.map((feedback, index) => (
                                <div key={index} className="feedback-response-large-card">
                                    <div className="feedback-card-text">{feedback}</div>
                                </div>
                            ))
                        ) : (
                            <div className="bill-response-large-card">
                                <h4>No feedback yet. Please provide some feedback.</h4>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default MyChanges
