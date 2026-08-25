import React, { useEffect } from "react";
import * as recurringTransaction from '../../api/recurringTransactions';

export default function RecurringTransactions() {
    const [loading, setLoading] = React.useState(null);
    const [error, setError] = React.useState(true);
    const [recurringTransactions, setRecurringTransactions] = React.useState([]);

    useEffect(() => {
                setLoading(true);
        
                fetch("/api/recurringTransactions")
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to fetch recurring transactions");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        setRecurringTransactions(data);
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
        <div className="recurring-transactions-page">

        </div>
    );
}