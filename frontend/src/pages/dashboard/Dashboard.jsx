import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
    const navigate = useNavigate();
    
    const [loading, setLoading] = React.useState(null);
    const [error, setError] = React.useState(true);
    
    if (loading) return <div style={{ padding: '2rem' }}> Loading</div>
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>
    
    return (
        <div className='dashboard-page'>
            
        </div>
    )
}