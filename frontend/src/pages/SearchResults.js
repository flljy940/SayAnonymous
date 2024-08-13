import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css'; // Create and style this CSS file as needed

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(query)}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(),
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await response.json();
                console.log('Search results:', data);
                setResults(data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    return (
        <div className="search-results">
            <h2>Search Results for: "{query}"</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {results.length === 0 && !loading && <p>No results found.</p>}
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result.content || result.username}</li> /* Replace with your result rendering logic */
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;
