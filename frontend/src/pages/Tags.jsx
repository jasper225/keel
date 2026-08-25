import React, { useEffect } from "react";

export default function Tags() {
    const [loading, setLoading] = React.useState(null);
    const [error, setError] = React.useState(true);
    const [tags, setTags] = React.useState([]);
    
        useEffect(() => {
                    setLoading(true);
            
                    fetch("/api/tags")
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Failed to fetch tags");
                            }
                            return response.json();
                        })
                        .then((data) => {
                            setTags(data);
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
        <div className="tag-page">
            
        </div>
    );
}