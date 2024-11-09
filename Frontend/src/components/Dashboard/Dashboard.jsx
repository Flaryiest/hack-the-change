import "../../style/Dashboard.css"
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <section className="dashboard-section">
        <h2>My Change</h2>
        <div className="dashboard-cards">
          <div className="dashboard-card">Content for My Change</div>
          <div className="dashboard-card">Another My Change item</div>
        </div>
      </section>
      
      <div className="dashboard-divider" />

      <section className="dashboard-section">
        <h2>Recent Changes</h2>
        <div className="dashboard-cards">
          <div className="dashboard-card">Recent item 1</div>
          <div className="dashboard-card">Recent item 2</div>
          <div className="dashboard-card">Recent item 3</div>
        </div>
      </section>

      <div className="dashboard-divider" />

      <section className="dashboard-section">
        <h2>Popular Changes</h2>
        <div className="dashboard-cards">
          <div className="dashboard-card">Popular item 1</div>
          <div className="dashboard-card">Popular item 2</div>
          <div className="dashboard-card">Popular item 3</div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
