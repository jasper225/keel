import React from "react";

export default function Categories() {
    const [loading, setLoading] = React.useState(null);
    const [error, setError] = React.useState(true);
    const [categories, setCategories] = React.useState([]);
    
        useEffect(() => {
                setLoading(true);
        
                fetch("/api/categories")
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to fetch categories");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        setCategories(data);
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
        <div className="category-page">

        </div>
    );
}