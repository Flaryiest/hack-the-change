import "../../style/Bills.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function Bills() {
    const [userInfo, setUserInfo, bills, setBills, render, triggerRender, userId] = useOutletContext();
    console.log(bills, "bills")
    useEffect(() => {
        fetch("https://swag.up.railway.app/result/bills")
            .then((response) => response.json())
            .then((data) => {
                setBills(data);
            })
            .catch((error) => console.error("Error fetching bills data:", error));
    }, [])
    

    return (
        <div className="bills-container">
            <div className="bills-column">
                <section className="bills-section">
                    <h3>Bills</h3>
                    <div className="bills-divider" />

                    <div className="bills-card-group">
                        {Object.keys(bills).map((billName, index) => (
                            <div key={index}>
                                <div className="bills-small-card">
                                    <h4>{billName}</h4>
                                    <p>Consensus: {Object.values(bills[billName].feedback)[0]}</p>
                                </div>
                                <div className="bills-large-card">
                                    <h4>{billName} Description</h4>
                                    <p>{bills[billName].description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
