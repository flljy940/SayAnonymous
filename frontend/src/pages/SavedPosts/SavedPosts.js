import React, { useEffect, useState } from 'react';
import Post from '../../components/Post';
import './SavedPosts.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar';

const SavedPosts = () => {

  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // Fetch saved posts from the server
  const getSavedPosts = async () => {
    try {
      const response = await fetch('/api/post/:userId/saved', {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data); // Update state with fetched posts
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      alert('Failed to fetch');
      console.error('Error:', error);
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    getSavedPosts();
  }, []);

  const posts1 = [
    {
      user: { name: 'NEW: love2030', avatar: 'avatar1.png' },
      time: '3 min ago',
      content: "This is HomeNew page",
      image: 'post-image1.jpg',
      likes: 21,
      comments: 4,
    },
    {
      user: { name: "What'sUp", avatar: 'avatar2.png' },
      time: '2 hrs ago',
      content: 'Thinking of traveling to Indonesia...',
      likes: 5,
      comments: 1,
    },
  ];

  return (
    <div className="container">
      <title>SayAnonymous</title>

      {/* Sidebar */}
      <div>
        <SideBar />
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Posts */}
        <div className="posts">
          {posts1.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SavedPosts;
