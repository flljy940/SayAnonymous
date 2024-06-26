import React, { useEffect, useState } from 'react';
import Post from '../../components/Post';
import './SavedPosts.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import SideItem from '../../components/SideItem';
import Person from '../../components/Person';
import Topic from '../../components/Topic';

const SavedPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (!token) {
      console.error('No token found. Please log in.');
    }

    try {
      const response = await fetch (`http://localhost:5000/api/post/posts/saved`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
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
      throw error;
    }
  };

  const handlePostClick = (postId) => {
    navigate(`posts/${postId}`);
  };

  /*
  const posts = [
    {
        user: { name: 'saver', avatar: 'avatar1.png' },
        time: '3 min ago',
        content: "See all your saved posts",
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

  const suggestedPeople = [
    { name: 'love2030', username: 'love2030', avatar: '../assets/profilePics/profile1.png' },
    { name: 'StraightA', username: 'StraightA', avatar: '../assets/profilePics/profile2.png' },
    { name: 'Danni', username: 'Danni', avatar: '../assets/profilePics/profile3.png' },
    { name: 'SoCguy', username: 'SoCguy', avatar: '../assets/profilePics/profile4.png' },
    { name: '404NotFound', username: '404NotFound', avatar: '../assets/profilePics/profile5.png' },
  ];

  const suggestedTopics = [
    { name: 'WhatAboutCoding', members: '2.1k' },
    { name: 'Photographers', members: '2k' },
    { name: 'LoveStories', members: '125' },
  ];

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
        <div className="post-list">
          <h1>Saved Posts</h1>
          <ul>
            {posts.map(post => (
                <li key={post.id} onClick={() => handlePostClick(post.id)} style ={{curse: 'pointer' }}>
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
          </ul>
        </div>
      </div>
        <Outlet />
      </nav>
  );
}

export default SavedPosts;
