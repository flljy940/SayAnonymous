import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Post from '../../components/Post';
import SideBar from '../../components/SideBar';
import './SavedPosts.css';

const SavedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/post/posts/saved`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.error || 'Failed to fetch saved posts');
      }

      const data = await response.json();
      console.log('Data:', data);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching saved posts', error);
    }
  };

  return (
    <div className="container">
      <title>SayAnonymous</title>

      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <div className="main-content">
        {/* Posts */}
        <div className="posts">
          {posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SavedPosts;
