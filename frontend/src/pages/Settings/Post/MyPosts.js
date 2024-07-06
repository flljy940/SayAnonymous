import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import './MyPosts.css';
import SideBar from '../../../components/SideBar';

import Post from '../../../components/Post';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`/api/profile/posts`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          const errorText = await response.text();
          setError(`Error: ${errorText}`);
        }
      } catch (err) {
        setError('Failed to fetch');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  
  if (loading) {
    return <div className="alert">Loading</div>;
  }

  if (error) {
    return <div className="alert">{error}</div>;
  }

  const fetchPosts = async (userId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found. Please log in.');
    }

    try {
      const response = await fetch (`http://localhost:5000/api/profile/posts`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      });
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.error || 'Failed to fetch my posts');
      }
      const data = await response.json();
      console.log('Data:', data);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching my posts', error);
      throw error;
    }
  };

  return (
    <nav className="content-container">
      <title>SayAnonymous</title>


      {/* Main content */}
      <div className="main-content">
        {/* Posts */}
        <div className='inRow'>
        <div className="posts">
          {posts.map(post => (
            <Post 
              key={post.id}
              user={post.user}
              time={post.time}
              image={post.image}
              content={post.content}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        </div>
        <button className='createPost'>
          <Link to="/pages/settings/newpost">
            + Create a post
          </Link>
        </button>
        </div>
      </div>
      <Outlet />
    </nav>
  );
};

export default MyPosts;