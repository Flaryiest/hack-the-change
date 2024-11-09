import "../../style/AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-column">
        <h2>Public</h2>
        <section className="admin-dashboard-section">
          <h3>Feedback</h3>
          <div className="admin-dashboard-divider" />
          <div className="admin-dashboard-cards">
            <div className="admin-dashboard-large-card">Feedback item 1</div>
          </div>
        </section>
      </div>

      <div className="admin-dashboard-column">
        <h2>Bills</h2>
        <section className="admin-dashboard-section">
          <h3>Proposed Bills</h3>
          <div className="admin-dashboard-divider" />
          
          <div className="admin-dashboard-card-group">
            <div className="admin-dashboard-small-card">Small card 1</div>
            <div className="admin-dashboard-small-card">Small card 2</div>
          </div>
          <div className="admin-dashboard-large-card">Large card content</div>

          <div className="admin-dashboard-divider" />

          <div className="admin-dashboard-card-group">
            <div className="admin-dashboard-small-card">Small card 3</div>
            <div className="admin-dashboard-small-card">Small card 4</div>
          </div>
          <div className="admin-dashboard-large-card">Large card content</div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
