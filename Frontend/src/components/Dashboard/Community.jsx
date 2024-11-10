import "../../style/Community.css";
import { useOutletContext } from "react-router-dom"
const Community = () => {
  const [userInfo, setUserInfo, bills, setBills, render, triggerRender] = useOutletContext()
    return (
      <div className="community-container">
        <section className="community-section">
          <h2>Community</h2>
          <div className="community-cards">
            <div className="community-card">
              <p>This is a description of Change Item 1. Here you can include more details about this particular change.</p>
            </div>
            <div className="community-card">
              <p>This is a description of Change Item 2. Here you can include more details about this particular change.</p>
            </div>
            <div className="community-card">
              <p>This is a description of Change Item 3. Here you can include more details about this particular change.</p>
            </div>
          </div>
        </section>
      </div>
    );
};

export default Community;
