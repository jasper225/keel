import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as account from "../api/account";

export default function Budgets() {
    const [loading, setLoading] = React.useState(null);
    const [error, setError] = React.useState(true);
    const [budgets, setBudgets] = React.useState([]);

    useEffect(() => {
            setLoading(true);
    
            fetch("/api/budgets")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch budgets");
                    }
                    return response.json();
                })
                .then((data) => {
                    setBudgets(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        }, []);
            
        if (loading) return <div style={{ padding: '2rem' }}> Loading</div>
        if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>
    
    return (
        <div className="budget-page">

        </div>
    );
}