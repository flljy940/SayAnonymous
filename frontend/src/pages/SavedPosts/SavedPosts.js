import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Post from '../../components/Post';
import SideBar from '../../components/SideBar';
import './SavedPosts.css';

const SavedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  
  useEffect(() => {
    fetchPosts();
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

  return (
    <div className="container">
      <title>SayAnonymous</title>

      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <div className="main-content">
        {/* posts */}
        {loadingPosts ? (
              <p>Loading posts...</p>
            ) : (
          <div className="posts">
            {posts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default SavedPosts;
