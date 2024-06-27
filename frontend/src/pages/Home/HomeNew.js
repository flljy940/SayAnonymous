// HomeNew.js
import React, { useEffect, useState } from 'react';
import Post from '../../components/Post';
import './Home.css';
import { Link } from 'react-router-dom';

const HomeNew = () => {
  /*
  const posts = [
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
    {
      user: { name: 'love2030', avatar: 'avatar1.png' },
      time: '3 min ago',
      content: "Hope everything's okay after PA :)",
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
    {
      user: { name: 'love2030', avatar: 'avatar1.png' },
      time: '3 min ago',
      content: "Hope everything's okay after PA :)",
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
  */

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found. Please log in.');
    }

    try {
      const response = await fetch (`http://localhost:5000/api/home/new`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      });
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.error || 'Failed to fetch new posts');
      }
      const data = await response.json();
      console.log('Data:', data);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching new posts', error);
      throw error;
    }
  };

  return (
    <div className="container">
      <title>SayAnonymous</title>

        {/* 中间部分 */}
        <div className="main-content">

            {/* 帖子 */}
            <div className="posts">
              {posts.map((post) => (
                <li key={post.id}>
                  <div>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    {post.image && <img scr={post.image} alt="Post" />}
                    <p>By {post.user.pseudonym}</p>
                    <p>{new Date(post.time).toLocaleString()}</p>
                    <p>Likes: {post.likes}</p>
                    <p>Comments: {post.comments}</p>
                  </div>
                </li>
              ))}
            </div>
        </div>  
    </div>
  );
}

export default HomeNew;
