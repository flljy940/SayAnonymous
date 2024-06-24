import React from 'react';
import Post from '../../components/Post';
import './SavedPosts.css';
import { Link, Outlet } from 'react-router-dom';
import SideItem from '../../components/SideItem';
import Person from '../../components/Person';
import Topic from '../../components/Topic';

const SavedPosts = () => {
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
        <div className="posts">
          {posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      </div>
        <Outlet />
      </nav>
  );
}

export default SavedPosts;
