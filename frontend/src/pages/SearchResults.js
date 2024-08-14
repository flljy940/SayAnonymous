import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Post from '../components/Post';
import Person from '../components/Person';
import UserProfile from '../components/UserProfile';
import './SearchResults.css';

const SearchResults = () => {
    const [results, setResults] = useState({ posts: [], users: []});
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
                setResults({
                    posts: data.posts || [],
                    users: data.users || [],
                });
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
            
            {results.posts.length > 0 && (
                <div className='posts-results'>
                    <h3>Posts</h3>
                    {results.posts.map(post => (
                        <Post 
                            key={post.id}
                            postId={post.id}
                            user={post.user}
                            time={post.created_at}
                            content={post.content}
                            image={post.image}
                            likes={post.likes}
                            comments={post.comments}
                            isLikedByUser={post.isLikedByUser}
                            isSavedByUser={post.isSavedByUser}
                        />
                    ))}
                </div>
            )}

            {results.users.length > 0 && (
                <div className="users-results">
                    <h3>Users</h3>
                    {results.users.map(user => (
                        <Person
                            key={user.id}
                            user={user}
                        />
                    ))}
                </div>
            )}
            {results.posts.length === 0 && results.users.length === 0 && !loading && (
                <p>No results found.</p>
            )}
            <Outlet />
        </div>
    );
};

export default SearchResults;
