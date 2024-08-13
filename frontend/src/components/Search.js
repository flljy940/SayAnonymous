import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../assets/search.png';
import './Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!query) return;

        setLoading(true);
        setError('');
        navigate(`/search?query=${encodeURIComponent(query)}`);

        try {
            const response = await fetch(`/search?query=${encodeURIComponent(query)}`);
            const data = await response.json();

            if (response.ok) {
                setResults(data.results);
            } else {
                setError(data.error || 'An error occurred while searching.');
            }
        } catch (err) {
            setError('An error occurred while searching.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='search-bar'>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className='search-input'
            />
            <div onClick={handleSearch} className='search-icon'>
                <img src={SearchIcon} alt="Search" />
            </div>

            {loading && <p>Loading...</p>}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul>
                {results.map((result) => (
                    <li key={result.id}>
                        <strong>{result.username}</strong>: {result.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
