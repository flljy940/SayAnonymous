import React from 'react';
import './MyPosts.css';
import { Link, Outlet } from 'react-router-dom';
import SideItem from '../../../components/SideItem';
import Post from '../../../components/Post';

const MyPosts = () => {
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
          {posts.map((post, index) => (
            <Post key={index} {...post} />
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
