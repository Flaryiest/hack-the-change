import "../../style/MyChanges.css";

const MyChanges = () => {
    return (
      <div className="my-changes-container">
        <section className="my-changes-section">
          <h2>My Changes</h2>
          <div className="my-changes-cards">
            <div className="my-changes-card">
              <h3>Change Item 1</h3>
              <p>This is a description of Change Item 1. Here you can include more details about this particular change.</p>
            </div>
            <div className="my-changes-card">
              <h3>Change Item 2</h3>
              <p>This is a description of Change Item 2. Here you can include more details about this particular change.</p>
            </div>
            <div className="my-changes-card">
              <h3>Change Item 3</h3>
              <p>This is a description of Change Item 3. Here you can include more details about this particular change.</p>
            </div>
          </div>
        </section>
      </div>
    )
}

export default MyChanges