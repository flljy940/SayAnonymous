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
        const response = await fetch(`http://localhost:5000/api/profile/posts`, {
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

  return (
    <nav className="content-container">
      {/* Main content */}
      <div className="main-content">
        {/* Posts */}
          <div className='inRow'>
          <div className="posts">
          {posts.length > 0 ? (
            posts.map(post => (
            <Post 
              key={post.id}
              postId={post.id}
              user={post.user}
              time={post.time}
              image={post.image}
              content={post.content}
              likes={post.likes}
              comments={post.comments}
            />
            ))
          ) : (
            <div className='alert'>Boo.. so empty</div>
          )}
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