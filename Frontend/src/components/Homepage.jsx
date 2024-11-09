import { Link } from "react-router-dom"
import "../style/Homepage.css"
export default function Homepage() {
    return <div>
            <div className="section-one">
                <div className="section-one-content">
                        <div className="section-one-sub-header">
                        </div>
                        <h1 className="section-one-header"><span className="aqua">Your Voice. Your Choices.</span></h1>
                    <div className="section-one-text">Founded by passionate individuals with diverse backgrounds, we are a registered Canadian non-profit organization striving to promote understanding and awareness of AI’s potential impact on our lives. </div>
                    <img className="section-one-image" src="/assets/democracy.png"></img>
                </div>
        </div>
    </div>
}