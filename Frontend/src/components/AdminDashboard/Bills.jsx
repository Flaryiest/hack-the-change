import "../../style/Bills.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom"
export default function Bills() {
    const [userInfo, setUserInfo, bills, setBills, render, triggerRender, userId] = useOutletContext()
    useEffect(() => {
        fetch("https://swag.up.railway.app/result/bills")
            .then((response) => response.json())
            .then((data) => {
                const formattedBills = Object.keys(data).map((billName) => ({
                    billName,
                    description: data[billName].description,
                    feedback: data[billName].feedback,
                }));
                setBills(formattedBills);
            })
            .catch((error) => console.error("Error fetching bills data:", error));
    }, []);

    return (
        <div className="bills-container">
            <div className="bills-column">
                <section className="bills-section">
                    <h3>Bills</h3>
                    <div className="bills-divider" />

                    <div className="bills-card-group">
                        {bills.map((bill, index) => (
                            <div key={index}>
                                <div className="bills-small-card">
                                    <h4>{bill.billName}</h4>
                                    <p>{bill.feedback}</p>
                                </div>
                                <div className="bills-large-card">
                                    <h4>{bill.billName} Description</h4>
                                    <p>{bill.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
