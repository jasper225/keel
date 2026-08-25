import React from "react";

export default function Reports() {
    const [error, setError] = React.useState(true);
    const [loading, setLoading] = React.useState(null);
    const [reports, setReports] = React.useState([]);
    
    if (loading) return <div style={{ padding: '2rem' }}> Loading</div>
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>
    
    return (
        <div className="report-page">
        </div>
    );
}