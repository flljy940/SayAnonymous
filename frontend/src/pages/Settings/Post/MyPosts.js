import React, { useState, useEffect } from 'react';
import './MyPosts.css';
import { Link, Outlet, useParams } from 'react-router-dom';
import SideItem from '../../../components/SideItem';
import Post from '../../../components/Post';

const MyPosts = () => {
  /*
  const posts = [
    {
        user: { name: 'allmy posts', avatar: 'avatar1.png' },
        time: '2024-06-12',
        content: "See all your past posts",
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

  const { userId } = useParams(); 
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts(userId);
  }, [userId]);

  const fetchPosts = async (userId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found. Please log in.');
    }

    try {
      const response = await fetch (`http://localhost:5000/api/profile/${userId}/posts`, {
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
    <nav className="container">
      <title>SayAnonymous</title>

      {/* Sidebar */}
      <div className='leftbar'>
        <div className="leftsidebar"></div>
        <div className="leftsideitem">
          <span className='sidename'>SayAnonymous</span>
          <SideItem picName="home" name="Home" path="/pages/home/*" clicked="n" />
          <SideItem picName="notifications" name="Notifications" path="/pages/home/*" clicked="n" />
          <SideItem picName="home" name="Saved" path="/pages/savedposts" clicked="y" />
          <SideItem picName="settings" name="Settings" path="/pages/settings/*" clicked="n" />
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Posts */}
        <div className="posts">
        {posts.map(post => (
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
        <div>
          + Create a post
        </div>
      </div>
        <Outlet />
      </nav>
  );
}

export default MyPosts;
