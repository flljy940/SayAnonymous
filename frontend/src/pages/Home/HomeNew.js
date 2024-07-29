// HomeNew.js
import React, { useEffect, useState } from 'react';
import Post from '../../components/Post';
import Person from '../../components/Person';
import Topic from '../../components/Topic';
import './Home.css';
import { Link, Outlet } from 'react-router-dom';

const HomeNew = () => {
  const [posts, setPosts] = useState([]);
  const [suggestedPeople, setSuggestedPeople] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingPeople, setLoadingPeople] = useState(true);

  useEffect(() => {
    fetchPosts();
    fetchSuggestedPeople();
  }, []);

  // Fetch posts from the server
  const fetchPosts = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/home/new`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.error || 'Failed to fetch top posts');
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching top posts', error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const fetchSuggestedPeople = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/suggestions/people', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch suggested people');
      }

      const data = await response.json();
      setSuggestedPeople(data);
    } catch (error) {
      console.error('Error getting suggested people:', error);
    } finally {
      setLoadingPeople(false);
    }
  };

  return (
    <div className="container">
      <div className="main-content">
        {loadingPosts ? (
          <p>Loading posts...</p>
        ) : (
          <div className="posts">
            {posts.map((post) => (
              <div key={post.id} className='post-card'>
                <Post postId={post.id} {...post} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="right-sidebar">
        <div className="suggested-section">
          <h3>Suggested people</h3>
          {loadingPeople ? (
            <p>Loading suggested people...</p>
          ) : (
            suggestedPeople.map((person, index) => (
              <div key={index} className='person'>
                <Person user={person} />
              </div>
            ))
            // <Person user={suggestedPeople} />
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default HomeNew;
