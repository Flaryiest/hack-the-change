import "../../style/Bills.css";

export default function Bills() {
    return (
        <div className="bills-container">
            <div className="bills-column">
                <section className="bills-section">
                    <h3>Bills</h3>
                    <div className="bills-divider" />

                    <div className="bills-card-group">
                        <div className="bills-small-card">
                            <h4>Small Card 1 Title</h4>
                            <p>This is a description for Small Card 1. You can add more details here about this bill or its contents.</p>
                        </div>
                        <div className="bills-small-card">
                            <h4>Small Card 2 Title</h4>
                            <p>This is a description for Small Card 2. You can add more details here about this bill or its contents.</p>
                        </div>
                    </div>
                    <div className="bills-large-card">
                        <h4>Large Card Title</h4>
                        <p>This is a description for the Large Card. You can provide detailed information about this bill in the paragraph below.</p>
                    </div>

                    <div className="bills-divider" />

                    <div className="bills-card-group">
                        <div className="bills-small-card">
                            <h4>Small Card 3 Title</h4>
                            <p>This is a description for Small Card 3. You can add more details here about this bill or its contents.</p>
                        </div>
                        <div className="bills-small-card">
                            <h4>Small Card 4 Title</h4>
                            <p>This is a description for Small Card 4. You can add more details here about this bill or its contents.</p>
                        </div>
                    </div>
                    <div className="bills-large-card">
                        <h4>Large Card Title</h4>
                        <p>This is a description for the Large Card. You can provide detailed information about this bill in the paragraph below.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
